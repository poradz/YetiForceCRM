<?php

/**
 * OSSTimeControl calendar view class.
 *
 * @copyright YetiForce Sp. z o.o
 * @license   YetiForce Public License 3.0 (licenses/LicenseEN.txt or yetiforce.com)
 */
class OSSTimeControl_Calendar_View extends Vtiger_Index_View
{
	/**
	 * {@inheritdoc}
	 */
	public function process(\App\Request $request)
	{
		$viewer = $this->getViewer($request);
		$currentUserModel = Users_Record_Model::getCurrentUserModel();
		$viewer->assign('CURRENT_USER', $currentUserModel);
		$viewer->assign('WEEK_VIEW', App\Config::module('Calendar', 'SHOW_TIMELINE_WEEK') ? 'timeGridWeek ' : 'dayGridWeek');
		$viewer->assign('DAY_VIEW', App\Config::module('Calendar', 'SHOW_TIMELINE_DAY') ? 'timeGridDay' : 'dayGridDay');
		$viewer->assign('ALL_DAY_SLOT', App\Config::module('Calendar', 'ALL_DAY_SLOT'));
		$viewer->view('CalendarView.tpl', $request->getModule());
	}

	protected function preProcessTplName(\App\Request $request)
	{
		return 'CalendarViewPreProcess.tpl';
	}

	/**
	 * {@inheritdoc}
	 */
	public function postProcess(\App\Request $request, $display = true)
	{
		$moduleName = $request->getModule();
		$viewer = $this->getViewer($request);
		$viewer->view('CalendarViewPostProcess.tpl', $moduleName);
		parent::postProcess($request);
	}

	/**
	 * {@inheritdoc}
	 */
	public function getFooterScripts(\App\Request $request)
	{
		$headerScriptInstances = parent::getFooterScripts($request);
		$moduleName = $request->getModule();
		if (isset($headerScriptInstances['modules.' . $moduleName . '.resources.Calendar'])) {
			unset($headerScriptInstances['modules.' . $moduleName . '.resources.Calendar']);
		}
		return array_merge($headerScriptInstances, $this->checkAndConvertJsScripts([
			'~libraries/@fullcalendar/core/main.js',
			'~libraries/@fullcalendar/daygrid/main.js',
			'~libraries/@fullcalendar/timegrid/main.js',
			'~libraries/@fullcalendar/bootstrap/main.js',
			'~libraries/@fullcalendar/interaction/main.js',
			// '~libraries/moment-timezone/moment-timezone.js',
			'~libraries/@fullcalendar/moment/main.js',
			// '~libraries/@fullcalendar/moment-timezone/main.js',
			'~libraries/css-element-queries/src/ResizeSensor.js',
			'~libraries/css-element-queries/src/ElementQueries.js',
			'~layouts/resources/Calendar.js',
			'modules.' . $moduleName . '.resources.Calendar',
		]));
	}

	/**
	 * {@inheritdoc}
	 */
	public function getHeaderCss(\App\Request $request)
	{
		return array_merge(parent::getHeaderCss($request), $this->checkAndConvertCssStyles([
			// '~libraries/@fullcalendar/core/main.min.css',
			'~libraries/@fullcalendar/daygrid/main.css',
			'~libraries/@fullcalendar/timegrid/main.css',
			'~libraries/@fullcalendar/bootstrap/main.css'
		]));
	}
}
