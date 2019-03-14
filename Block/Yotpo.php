<?php
namespace Integration\Yotpo\Block;

/**
 * 
 */
class Yotpo extends \Magento\Framework\View\Element\Template
{
    protected $storeManager;
    protected $config;

    function __construct(
        \Magento\Framework\View\Element\Template\Context $templateContext,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        Config $config,
        array $data = []
    )
    {
        $this->storeManager = $storeManager;
        $this->config = $config; 
        parent::__construct($templateContext);
    }

    public function getAppkey()
    {
        $storeId = $this->storeManager->getStore()->getId();
        return $this->config->getAppkey($storeId);
    }

    public function getSecret()
    {
        $storeId = $this->storeManager->getStore()->getId();
        return $this->config->getSecret($storeId);
    }
}