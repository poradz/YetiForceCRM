<?php

/**
 * Action to get Chat data.
 *
 * @package Action
 *
 * @copyright YetiForce Sp. z o.o
 * @license   YetiForce Public License 3.0 (licenses/LicenseEN.txt or yetiforce.com)
 * @author    Mariusz Krzaczkowski <m.krzaczkowski@yetiforce.com>
 * @author    Arkadiusz Adach <a.adach@yetiforce.com>
 * @author    Tomasz Poradzewski <t.poradzewski@yetiforce.com>
 */
class Chat_ChatAjax_Action extends \App\Controller\Action
{
	use \App\Controller\ExposeMethod;

	/**
	 * Constructor.
	 */
	public function __construct()
	{
		parent::__construct();
		$this->exposeMethod('getInitData');
		$this->exposeMethod('getMessages');
		$this->exposeMethod('getMoreMessages');
		$this->exposeMethod('getUnread');
		$this->exposeMethod('getHistory');
		$this->exposeMethod('getRooms');
		$this->exposeMethod('send');
		$this->exposeMethod('search');
		$this->exposeMethod('trackNewMessages');
	}

	/**
	 * {@inheritdoc}
	 */
	public function checkPermission(App\Request $request)
	{
		$currentUserPriviligesModel = Users_Privileges_Model::getCurrentUserPrivilegesModel();
		if (!$currentUserPriviligesModel->hasModulePermission($request->getModule())) {
			throw new \App\Exceptions\NoPermitted('ERR_NOT_ACCESSIBLE', 406);
		}
	}

	/**
	 * Get chat init data
	 *
	 * @param App\Request $request
	 *
	 * @return void
	 */
	public function getInitData(App\Request $request)
	{
		$chat = \App\Chat::getInstance();
		$chatEntries = $chat->getEntries();
		$response = new Vtiger_Response();
		$response->setResult([
			'chatEntries' => $chatEntries,
			'currentRoom' => \App\Chat::getCurrentRoom(),
			'roomList' => \App\Chat::getRoomsByUser(),
			'participants' => $chat->getParticipants(),
			'isModalView' => true,
			'isSoundNotification' => $this->isSoundNotification(),
			'isDesktopNotification' => $this->isDesktopNotification(),
			'sendByEnter' => $this->sendByEnter(),
			'showMoreButton' => true,
			'refreshMessageTime' => App\Config::module('Chat', 'REFRESH_MESSAGE_TIME'),
			'refreshRoomTime' => App\Config::module('Chat', 'REFRESH_ROOM_TIME'),
			'maxLengthMessage' => App\Config::module('Chat', 'MAX_LENGTH_MESSAGE'),
			'refreshTimeGlobal' => App\Config::module('Chat', 'REFRESH_TIME_GLOBAL'),
			'showNumberOfNewMessages' => App\Config::module('Chat', 'SHOW_NUMBER_OF_NEW_MESSAGES'),
			'isChatAllowed' => \App\User::getCurrentUserRealId() === \App\User::getCurrentUserId()
		]);
		$response->emit();
	}

	/**
	 * Get messages from chat.
	 *
	 * @param \App\Request $request
	 *
	 * @throws \App\Exceptions\IllegalValue
	 */
	public function getMessages(\App\Request $request)
	{
		if ($request->has('roomType') && $request->has('recordId')) {
			$roomType = $request->getByType('roomType');
			$recordId = $request->getInteger('recordId');
			if (!$request->getBoolean('viewForRecord')) {
				\App\Chat::setCurrentRoom($roomType, $recordId);
			}
		} else {
			$currentRoom = \App\Chat::getCurrentRoom();
			if (!$currentRoom || !isset($currentRoom['roomType']) || !isset($currentRoom['recordId'])) {
				throw new \App\Exceptions\IllegalValue('ERR_NOT_ALLOWED_VALUE', 406);
			}
			$roomType = $currentRoom['roomType'];
			$recordId = $currentRoom['recordId'];
		}
		$chat = \App\Chat::getInstance($roomType, $recordId);
		if (!$chat->isRoomExists()) {
			return;
		}
		$chatEntries = $chat->getEntries($request->has('lastId') ? $request->getInteger('lastId') : null);
		$result = [
			'chatEntries' => $chatEntries,
			'roomList' => \App\Chat::getRoomsByUser(),
			'participants' => $chat->getParticipants()
		];
		if (!$request->has('lastId')) {
			$result['showMoreButton'] = $this->areMoreMessages(count($chatEntries));
			$result['currentRoom'] = \App\Chat::getCurrentRoom();
		}

		$response = new Vtiger_Response();
		$response->setResult($result);
		$response->emit();
	}
	/**
	 * Get more messages from chat.
	 *
	 * @param \App\Request $request
	 *
	 * @throws \App\Exceptions\AppException
	 * @throws \App\Exceptions\IllegalValue
	 * @throws \yii\db\Exception
	 */
	public function getMoreMessages(\App\Request $request)
	{
		$chat = \App\Chat::getInstance($request->getByType('roomType'), $request->getInteger('recordId'));
		$chatEntries = $chat->getEntries($request->getInteger('lastId'), '<');
		$response = new Vtiger_Response();
		$response->setResult([
			'currentRoom' => \App\Chat::getCurrentRoom(),
			'chatEntries' => $chatEntries,
			'showMoreButton' => $this->areMoreMessages(count($chatEntries)),
		]);
		$response->emit();
	}
	/**
	 * Send message function.
	 *
	 * @param \App\Request $request
	 */
	public function send(\App\Request $request)
	{
		$chat = \App\Chat::getInstance($request->getByType('roomType'), $request->getInteger('recordId'));
		if (!$chat->isRoomExists()) {
			throw new \App\Exceptions\IllegalValue('ERR_NOT_ALLOWED_VALUE', 406);
		}
		$chat->addMessage(\App\Utils\Completions::encodeAll($request->getForHtml('message')));
		$chatEntries = $chat->getEntries($request->isEmpty('mid') ? null : $request->getInteger('mid'));
		$response = new Vtiger_Response();
		$response->setResult([
			'chatEntries' => $chatEntries,
			'participants' => $chat->getParticipants(),
			'showMoreButton' => $this->areMoreMessages(count($chatEntries))
		]);
		$response->emit();
	}

	/**
	 * Search meassages.
	 *
	 * @param \App\Request $request
	 *
	 * @throws \App\Exceptions\IllegalValue
	 */
	public function search(\App\Request $request)
	{
		$chat = \App\Chat::getInstance($request->getByType('roomType'), $request->getInteger('recordId'));
		$searchVal = $request->getByType('searchVal', 'Text');
		if (!$request->isEmpty('mid')) {
			$chatEntries = $chat->getEntries($request->getInteger('mid'), '<', $searchVal);
		} else {
			$chatEntries = $chat->getEntries(null, '>', $searchVal);
		}
		$response = new Vtiger_Response();
		$response->setResult([
			'currentRoom' => \App\Chat::getCurrentRoom(),
			'chatEntries' => $chatEntries,
			'showMoreButton' => $this->areMoreMessages(count($chatEntries))
		]);
		$response->emit();
	}

	/**
	 * Get all unread messages.
	 *
	 * @param \App\Request $request
	 *
	 * @throws \App\Exceptions\AppException
	 */
	public function getUnread(\App\Request $request)
	{
		$response = new Vtiger_Response();
		$response->setResult([
			'crm' => \App\Chat::getUnreadByType('crm'),
			'group' => \App\Chat::getUnreadByType('group'),
			'global' => \App\Chat::getUnreadByType('global'),
		]);
		$response->emit();
	}

	/**
	 * Get history.
	 *
	 * @param \App\Request $request
	 *
	 * @throws \App\Exceptions\AppException
	 * @throws \App\Exceptions\IllegalValue
	 */
	public function getHistory(\App\Request $request)
	{
		$chat = \App\Chat::getInstance();
		$groupHistory = $request->getByType('groupHistory', 2);
		if (!in_array($groupHistory, \App\Chat::ALLOWED_ROOM_TYPES)) {
			throw new \App\Exceptions\NoPermittedToRecord('ERR_NO_PERMISSIONS_FOR_THE_RECORD', 406);
		}
		if ($request->isEmpty('mid')) {
			$chatEntries = $chat->getHistoryByType($groupHistory);
		} else {
			$chatEntries = $chat->getHistoryByType($groupHistory, $request->getInteger('mid'));
		}
		$response = new Vtiger_Response();
		$response->setResult([
			'chatEntries' => $chatEntries,
			'showMoreButton' => $this->areMoreMessages(count($chatEntries))
		]);
		$response->emit();
	}

	/**
	 * Get rooms function.
	 *
	 * @param \App\Request $request
	 */
	public function getRooms(App\Request $request)
	{
		$response = new Vtiger_Response();
		$response->setResult([
			'roomList' => \App\Chat::getRoomsByUser()
		]);
		$response->emit();
	}

	/**
	 * Track the number of new messages.
	 *
	 * @param \App\Request $request
	 */
	public function trackNewMessages(App\Request $request)
	{
		$response = new Vtiger_Response();
		if (App\Config::module('Chat', 'SHOW_NUMBER_OF_NEW_MESSAGES')) {
			$response->setResult(\App\Chat::getNumberOfNewMessages());
		} else {
			$response->setResult(\App\Chat::isNewMessages() ? 1 : 0);
		}
		$response->emit();
	}

	/**
	 * Check if there are more messages.
	 *
	 * @return bool
	 */
	private function areMoreMessages(int $numberOfMessages): bool
	{
		return $numberOfMessages >= \App\Config::module('Chat', 'CHAT_ROWS_LIMIT');
	}

	/**
	 * Check if sound notification is enabled.
	 *
	 * @return bool
	 */
	private function isSoundNotification(): bool
	{
		return isset($_COOKIE['chat-isSoundNotification']) ?
			filter_var($_COOKIE['chat-isSoundNotification'], FILTER_VALIDATE_BOOLEAN) : \App\Config::module('Chat', 'DEFAULT_SOUND_NOTIFICATION');
	}

	/**
	 * Check if desktop notification is enabled.
	 *
	 * @return bool
	 */
	private function isDesktopNotification(): bool
	{
		return isset($_COOKIE['chat-isDesktopNotification']) ?
			filter_var($_COOKIE['chat-isDesktopNotification'], FILTER_VALIDATE_BOOLEAN) : false;
	}

	/**
	 * Check if sending on ENTER is active.
	 *
	 * @return bool
	 */
	private function sendByEnter(): bool
	{
		return isset($_COOKIE['chat-notSendByEnter']) ?
			!filter_var($_COOKIE['chat-notSendByEnter'], FILTER_VALIDATE_BOOLEAN) : true;
	}
}
