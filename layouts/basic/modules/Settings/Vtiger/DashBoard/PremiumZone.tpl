{*<!-- {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} -->*}
{strip}
	<div class="tpl-Settings-Base-DashBoard-PremiumZone">
		{assign var="QUALIFIED_MODULE" value='Settings:YetiForce'}
		{foreach $PRODUCTS as $PRODUCT}
			<div class="dashboardWidget">
				{include file=\App\Layout::getTemplatePath('Shop/SmallProduct.tpl', 'Settings:YetiForce')}
			</div>
		{/foreach}
	</div>
{/strip}
