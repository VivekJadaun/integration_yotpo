<?php
  namespace Integration\Yotpo\Setup;

  use Magento\Framework\Setup\InstallDataInterface;
  use Magento\Framework\Setup\ModuleContextInterface;
  use Magento\Framework\Setup\ModuleDataSetupInterface;

  class UpgradeData implements InstallDataInterface
  {
    const SCOPE_STORES = \Magento\Store\Model\ScopeInterface::SCOPE_STORES;
    
    protected $configWriter;

    public function __construct (
      \Magento\Store\Model\StoreManagerInterface $storeManager,
      \Magento\Framework\App\Config\Storage\WriterInterface $configWriter
    )
    {
      $this->storeManager = $storeManager;
      $this->configWriter = $configWriter;
    }

    public function install (ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
      $setup->startSetup();
      if (version_compare($context->getVersion(), '1.0.1', '<')) {
        $currentStoreId = $this->storeManager->getStore()->getId();
        $this->configWriter->save('catalog/review/allow_guest', '0', self::SCOPE_STORES, $currentStoreId);
      }
      $setup->endSetup();
    }
  }
