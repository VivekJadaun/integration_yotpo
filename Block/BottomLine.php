<?php 
namespace Integration\Yotpo\Block;

/**
 * 
 */
class BottomLine extends \Magento\Framework\View\Element\Template
{
    const COUNT = 10;
    protected $storeManager;
    protected $api;
    protected $productRepository;

    function __construct(
        \Magento\Framework\View\Element\Template\Context $templateContext,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Integration\Yotpo\Helper\ApiHelper $api,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        array $data = []
    )
    {
        $this->storeManager = $storeManager;
        $this->api = $api;
        $this->productRepository = $productRepository;
        parent::__construct($templateContext);
    }

    public function getBottomLine($page, $count = self::COUNT, $sku = null)
    {
        if ($sku) {
            $bottomLine = $this->api->getBottomLine($count, $page, $sku);
        } else {
            $bottomLine = $this->api->getBottomLine($count, $page);
        }

        return $bottomLine;
    }

    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        
        
        return $this;
    }
}