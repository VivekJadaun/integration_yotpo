<?php
namespace Integration\Yotpo\Block;

use Magento\Store\Model\ScopeInterface;

class Config
{
    const YOTPO_APPKEY = 'integrations/yotpo/appkey';
    const YOTPO_SECRET = 'integrations/yotpo/secret';

    protected $scopeConfig;

    function __construct(
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    )
    {
        $this->scopeConfig = $scopeConfig;    
    }

    public function getAppkey($storeId = null)
    {
        return $this->scopeConfig->getValue(self::YOTPO_APPKEY, ScopeInterface::SCOPE_STORES, $storeId);
    }

    public function getSecret($storeId = null)
    {
        return $this->scopeConfig->getValue(self::YOTPO_SECRET, ScopeInterface::SCOPE_STORES, $storeId);
    }
}