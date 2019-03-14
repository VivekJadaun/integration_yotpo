<?php 
namespace Integration\Yotpo\Block\Product;

use Magento\Framework\Registry;
/**
 * 
 */
class Review extends \Magento\Framework\View\Element\Template
{
    const COUNT = 5;
    protected $storeManager;
    protected $api;

    function __construct(
        \Magento\Framework\View\Element\Template\Context $templateContext,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Integration\Yotpo\Helper\ApiHelper $api,
        Registry $registry,
        array $data = []
    )
    {
        $this->storeManager = $storeManager;
        $this->api = $api;
        $this->registry = $registry;
        parent::__construct($templateContext);
    }

    public function getAllReviews($count = self::COUNT, $page)
    {
        $storeId = $this->storeManager->getStore()->getId();
        $product = $this->getCurrentProduct();
        $reviews = $this->api->fetchProductReviews($storeId, $product->getSku(), $count, $page);
        return $reviews;
    }

    public function isValidProduct($sku)
    {
        return (bool)$this->getCurrentProduct()->getIdBySku($sku);
    }

    public function getCurrentProduct()
    {
        return $this->registry->registry('product');
    }

    public function getBottomLine()
    {
        $sku = $this->getCurrentProduct()->getSku();
        $storeId = $this->storeManager->getStore()->getId();
        return $this->api->getBottomLine($storeId, $sku);
    }

    public function getTotalPageCount($perPage = self::COUNT)
    {
        $response = $this->getBottomLine(1, $perPage);
        return ceil($response['body']['response']['bottomline']['total_reviews'] / $perPage) ;
    }

    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        $this->pageConfig->getTitle()->set(__('Yotpo Reviews'));

        
        return $this;
    }
}