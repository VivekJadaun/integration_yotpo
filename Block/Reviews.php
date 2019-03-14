<?php 
namespace Integration\Yotpo\Block;

/**
 * 
 */
class Reviews extends \Magento\Framework\View\Element\Template
{
    const COUNT = 5;
    protected $storeManager;
    protected $api;
    protected $productRepository;

    function __construct(
        \Magento\Framework\View\Element\Template\Context $templateContext,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Integration\Yotpo\Helper\ApiHelper $api,
        // \Magento\Catalog\Api\ProductRepositoryInterface $productRepository,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        array $data = []
    )
    {
        $this->storeManager = $storeManager;
        $this->api = $api;
        $this->productRepository = $productRepository;
        parent::__construct($templateContext);
    }

    public function getAllReviews($page = 1, $count = self::COUNT)
    {
        try {
            $storeId = $this->storeManager->getStore()->getId();
            $reviews = $this->api->fetchAllReviews($storeId, $count, $page);
            return $reviews;
        } catch (\Exception $e) {
            return false;            
        }
    }

    public function getProductUrl($sku)
    {
        try {
            $product = $this->productRepository->get($sku);
            return $product->getProductUrl();
        } catch (\Exception $e) {
            return false;
        }   
    }

    // public function getBottomLine($page, $count = self::COUNT, $sku = null)
    // {
    //     $storeId = $this->storeManager->getStore()->getId();
    //     if ($sku) {
    //         $bottomLine = $this->api->getBottomLine($storeId, $count, $page, $sku);
    //     } else {
    //         $bottomLine = $this->api->getBottomLine($storeId, $count, $page);
    //     }

    //     return $bottomLine;
    // }

    // public function getTotalPageCount()
    // {
    //     $response = $this->getBottomLine(1, self::COUNT);
    //     $totalReviews = 0;
    //     foreach ($response['body']['response']['bottomlines'] as $key => $product) {
    //         // var_dump($product);
    //         $totalReviews = $totalPages + $product['total_reviews'];
    //     }
    //     return $totalReviews ;
    // }
    
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        $this->pageConfig->getTitle()->set(__('Yotpo Reviews'));

        
        return $this;
    }
}