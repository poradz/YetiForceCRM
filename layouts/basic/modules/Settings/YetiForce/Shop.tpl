{*<!-- {[The file is published on the basis of YetiForce Public License 3.0 that can be found in the following directory: licenses/LicenseEN.txt or yetiforce.com]} -->*}
{strip}
	<div class="tpl-Settings-YetiForce-Shop">
		<div class="o-breadcrumb widget_header mb-2 d-flex flex-nowrap flex-md-wrap justify-content-between px-2 row">
			<div class="o-breadcrumb__container">
				{include file=\App\Layout::getTemplatePath('BreadCrumbs.tpl', $QUALIFIED_MODULE)}
			</div>
		</div>
		<div class=" mt-3">
			{if $STATUS}
				<div class="col-md-12">
					{if 'success'===$STATUS}
						<div class="alert alert-success">
							{\App\Language::translate('LBL_SUCCESSFUL_TRANSACTION', $QUALIFIED_MODULE)}
						</div>
					{else}
						<div class="alert alert-danger">
							{\App\Language::translate('LBL_FAILED_TRANSACTION', $QUALIFIED_MODULE)}
						</div>
					{/if}
				</div>
			{/if}
			<nav>
				<div class="nav nav-tabs" role="tablist">
					<a class="nav-item nav-link active" id="nav-premium-tab" data-toggle="tab" href="#nav-premium" role="tab" aria-controls="nav-premium" aria-selected="true">
						{\App\Language::translate('LBL_PREMIUM_ZONE', $QUALIFIED_MODULE)}
					</a>
					<a class="nav-item nav-link" id="nav-partner-tab" data-toggle="tab" href="#nav-partner" role="tab" aria-controls="nav-partner" aria-selected="false">
						{\App\Language::translate('LBL_PARTNER_ZONE', $QUALIFIED_MODULE)}
					</a>
				</div>
			</nav>
			<div class="tab-content">
				<div class="tab-pane fade show active" id="nav-premium" role="tabpanel" aria-labelledby="nav-premium-tab">
					<div class="container pt-3">
						{foreach $PRODUCTS_PREMIUM as $PRODUCT}
							{include file=\App\Layout::getTemplatePath('Shop/Product.tpl', $QUALIFIED_MODULE)}
						{/foreach}
					</div>
				</div>
				<div class="tab-pane fade" id="nav-partner" role="tabpanel" aria-labelledby="nav-partner-tab">
					<div class="container pt-3">
							{foreach $PRODUCTS_PARTNER as $PRODUCT}
								{include file=\App\Layout::getTemplatePath('Shop/Product.tpl', $QUALIFIED_MODULE)}
							{/foreach}
					</div>
				</div>
			</div>
		</div>
	</div>
{/strip}
