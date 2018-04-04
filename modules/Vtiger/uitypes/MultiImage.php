<?php
/**
 * UIType MultiImage Field Class.
 *
 * @copyright YetiForce Sp. z o.o
 * @license   YetiForce Public License 3.0 (licenses/LicenseEN.txt or yetiforce.com)
 * @author    Michał Lorencik <m.lorencik@yetiforce.com>
 * @author    Radosław Skrzypczak <r.skrzypczak@yetiforce.com>
 */

/**
 * UIType MultiImage Field Class.
 */
class Vtiger_MultiImage_UIType extends Vtiger_Base_UIType
{
	/**
	 * {@inheritdoc}
	 */
	public function setValueFromRequest(\App\Request $request, Vtiger_Record_Model $recordModel, $requestFieldName = false)
	{
		$fieldName = $this->getFieldModel()->getFieldName();
		if (!$requestFieldName) {
			$requestFieldName = $fieldName;
		}
		$value = \App\Fields\File::updateUploadFiles($request->getArray($requestFieldName, 'Text'), $recordModel, $this->getFieldModel());
		$this->validate($value, true);
		$recordModel->set($fieldName, $this->getDBValue($value, $recordModel));
	}

	/**
	 * {@inheritdoc}
	 */
	public function validate($value, $isUserFormat = false)
	{
		if ($this->validate || empty($value)) {
			return;
		}
		if (!$isUserFormat) {
			$value = \App\Json::decode($value);
		}
		$fieldInfo = $this->getFieldModel()->getFieldInfo();
		foreach ($value as $index => $item) {
			if (empty($item['key']) || empty($item['name']) || empty($item['size']) || App\TextParser::getTextLength($item['key']) !== 50) {
				throw new \App\Exceptions\Security('ERR_ILLEGAL_FIELD_VALUE||' . $this->getFieldModel()->getFieldName() . '||' . \App\Json::encode($value), 406);
			}
			if ($index > (int) $fieldInfo['limit']) {
				throw new \App\Exceptions\Security('ERR_TO_MANY_FILES||' . $this->getFieldModel()->getFieldName() . '||' . \App\Json::encode($value), 406);
			}
			$file = \App\Fields\File::loadFromInfo([
				'path' => \App\Fields\File::getLocalPath($item['path']),
				'name' => $item['name'],
			]);
			$validFormat = $file->validate('image');
			$validExtension = false;
			foreach ($fieldInfo['formats'] as $format) {
				if ($file->getExtension(true) === strtolower($format)) {
					$validExtension = true;
					break;
				}
			}
			if (!$validExtension || !$validFormat) {
				throw new \App\Exceptions\Security('ERR_FILE_WRONG_IMAGE||' . $this->getFieldModel()->getFieldName() . '||' . \App\Json::encode($value), 406);
			}
		}
		$params = $this->getFieldModel()->getFieldParams();
		$this->validate = true;
	}

	/**
	 * {@inheritdoc}
	 */
	public function getDBValue($value, $recordModel = false)
	{
		return \App\Json::encode($value);
	}

	/**
	 * Get image url.
	 *
	 * @param {string} $key
	 * @param {int}    $record
	 *
	 * @return string
	 */
	public function getImageUrl($key, $record)
	{
		return "file.php?module={$this->getFieldModel()->getModuleName()}&action=MultiImage&field={$this->getFieldModel()->getFieldName()}&record={$record}&key={$key}";
	}

	/**
	 * Get display value as string in JSON format.
	 *
	 * @param {string} $value
	 * @param bool|int $length
	 *
	 * @return string
	 */
	public function getDisplayValueEncoded($value, $record, $length = false)
	{
		$value = \App\Json::decode($value);
		if (!is_array($value)) {
			return '[]';
		}
		$len = $length ?: count($value);
		for ($i = 0; $i < $len; $i++) {
			$value[$i]['imageSrc'] = $this->getImageUrl($value[$i]['key'], $record);
			unset($value[$i]['path']);
		}
		return \App\Purifier::encodeHtml(\App\Json::encode($value));
	}

	/**
	 * Function to get Display value for ModTracker.
	 *
	 * @param                      $value
	 * @param \Vtiger_Record_Model $recordModel
	 *
	 * @return mixed
	 */
	public function getHistoryDisplayValue($value, Vtiger_Record_Model $recordModel)
	{
		$value = \App\Json::decode($value);
		if (!is_array($value)) {
			return '';
		}
		$value = array_map(function ($v) {
			return $v['name'];
		}, $value);
		$result = implode(', ', $value);
		return trim($result, "\n\s\t, ");
	}

	/**
	 * {@inheritdoc}
	 */
	public function getDisplayValue($value, $record = false, $recordModel = false, $rawText = false, $length = false)
	{
		$value = \App\Json::decode($value);
		if (!$value) {
			return '';
		}
		$len = $length ?: count($value);
		if (!$record && $recordModel) {
			$record = $recordModel->getId();
		}
		if ($rawText || !$record) {
			$result = '';
			if (!is_array($value)) {
				return '';
			}
			for ($i = 0; $i < $len; $i++) {
				$val = $value[$i];
				$result .= $val['name'] . ', ';
			}
			return \App\Purifier::encodeHtml(trim($result, "\n\s\t ,"));
		}
		if (!is_array($value)) {
			return '';
		}
		$result = '<div class="c-multi-image__result" style="width:100%">';
		$width = 1 / count($value) * 100;
		for ($i = 0; $i < $len; $i++) {
			if ($record) {
				$src = $this->getImageUrl($value[$i]['key'], $record);
				$result .= '<div class="d-inline-block mr-1 c-multi-image__preview-img" style="background-image:url(' . $src . ')" style="width:' . $width . '%"></div>';
			} else {
				$result .= \App\Purifier::encodeHtml($value[$i]['name']) . ', ';
			}
		}
		return trim($result, "\n\s\t ") . '</div>';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getListViewDisplayValue($value, $record = false, $recordModel = false, $rawText = false)
	{
		$value = \App\Json::decode($value);
		if (!$value) {
			return '';
		}
		if (!$record && $recordModel) {
			$record = $recordModel->getId();
		}
		if ($rawText || !$record) {
			$result = '';
			if (!is_array($value)) {
				return '';
			}
			for ($i = 0; $i < $len; $i++) {
				$val = $value[$i];
				$result .= $val['name'] . ', ';
			}
			return \App\Purifier::encodeHtml(trim($result, "\n\s\t ,"));
		}
		if (!is_array($value)) {
			return '';
		}
		$result = '<div class="c-multi-image__result">';
		foreach ($value as $item) {
			if ($record) {
				$result .= '<div class="d-inline-block mr-1 c-multi-image__preview-img" style="background-image:url(' . $this->getImageUrl($item['key'], $record) . ')"></div>';
			} else {
				$result .= \App\Purifier::encodeHtml($item['name']) . ', ';
			}
		}
		return $result . '</div>';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getEditViewDisplayValue($value, $recordModel = false)
	{
		$value = \App\Json::decode($value);
		if (is_array($value)) {
			foreach ($value as &$item) {
				$item['imageSrc'] = $this->getImageUrl($item['key'], $recordModel->getId());
				unset($item['path']);
			}
		} else {
			$value = [];
		}
		return \App\Purifier::encodeHtml(\App\Json::encode($value));
	}

	/**
	 * {@inheritdoc}
	 */
	public function getTemplateName()
	{
		return 'uitypes/MultiImage.tpl';
	}

	/**
	 * {@inheritdoc}
	 */
	public function getDetailViewTemplateName()
	{
		return 'uitypes/MultiImageDetailView.tpl';
	}

	/**
	 * If the field is editable by ajax.
	 *
	 * @return bool
	 */
	public function isAjaxEditable()
	{
		return false;
	}

	/**
	 * If the field is active in search.
	 *
	 * @return bool
	 */
	public function isActiveSearchView()
	{
		return false;
	}

	/**
	 * If the field is sortable in ListView.
	 *
	 * @return bool
	 */
	public function isListviewSortable()
	{
		return false;
	}
}
