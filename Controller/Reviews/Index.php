<?php 
namespace Integration\Yotpo\Controller\Reviews;

/**
 * 
 */
class Index extends \Magento\Framework\App\Action\Action
{
    protected $config;
    protected $api;
    protected $logger;
    protected $messageManager;
    protected $storeManager;
    protected $resultRedirectFactory;
    protected $resultPageFactory;

    public function __construct(
        \Magento\Framework\App\Action\Context $context,
        \Integration\Yotpo\Block\Config $config,
        \Integration\Yotpo\Helper\ApiHelper $api,
        \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\View\Result\PageFactory $resultPageFactory,
        \Psr\Log\LoggerInterface $logger
    )
    {
        $this->config = $config;
        $this->api = $api;
        $this->logger = $logger;
        $this->storeManager = $storeManager;
        $this->messageManager = $context->getMessageManager();
        $this->resultRedirectFactory = $resultRedirectFactory;
        $this->resultPageFactory = $resultPageFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        // try {
        //     // $postData = $this->httpRequest->getPost()->toArray();
        //     // $storeId = $postData['store_id'];
        //     $storeId = $this->storeManager->getStore()->getId();
        //     $appkey = $this->config->getAppkey($storeId);
        //     $secret = $this->config->getSecret($storeId);
        //     if (($secret == null) || ($appkey == null)) {
        //         $this->messageManager->addError(__("Please enter valid APPKEY and/or SECRET"));
        //         return;
        //     }

            // $token = $this->api->oauthAuthentication($storeId);
            // if (!$token) {
            //     $this->messageManager->addError(__("Please make sure that APPKEY & SECRET provided by you are correct"));
            //     return;
            // }

            // $reviews = $this->api->fetchAllReviews($storeId);

            // var_dump($reviews['body']);
            return $this->resultPageFactory->create();

        // } catch (\Exception $e) {
        //     $this->logger->addDebug("Yotpo Review Index Action Error : $e");
        // }
    }
}