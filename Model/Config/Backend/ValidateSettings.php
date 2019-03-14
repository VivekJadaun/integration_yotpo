<?php 

namespace Integration\Yotpo\Model\Config\Backend;

class ValidateSettings extends \Magento\Framework\App\Config\Value
{
    protected $context;

    public function __construct(
        \Magento\Framework\Model\Context $context,
        \Magento\Framework\Registry $registry,
        \Magento\Framework\App\Config\ScopeConfigInterface $config,
        \Magento\Framework\App\Cache\TypeListInterface $cacheTypeList,
        \Magento\Framework\Model\ResourceModel\AbstractResource $resource = null,
        \Magento\Framework\Data\Collection\AbstractDb $resourceCollection = null,
        array $data = []
    ) 
    {
        $this->context = $context;
        parent::__construct($context, $registry, $config, $cacheTypeList, $resource, $resourceCollection, $data);
    }

    public function afterSave()
    {
        if ($this->isValueChanged()) {
            $this->context->getCacheManager()->clean();
        }
        
        // return parent::afterSave();
        return $this;
    }
}