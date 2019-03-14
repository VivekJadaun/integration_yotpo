<?php 
namespace Integration\Yotpo\Controller\Adminhtml\Yotpo;

/**
 * 
 */
class Index extends \Magento\Backend\App\Action
{
    protected $httpRequest;
    protected $httpResponse;
    protected $config;
    protected $api;
    protected $logger;
    protected $messageManager;
    protected $resultRedirectFactory;

    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\App\Request\Http $httpRequest,
        \Magento\Framework\App\Response\Http $httpResponse,
        \Integration\Yotpo\Block\Config $config,
        \Integration\Yotpo\Helper\ApiHelper $api,
        \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory,
        \Psr\Log\LoggerInterface $logger
    )
    {
        $this->httpRequest = $httpRequest;
        $this->httpResponse = $httpResponse;
        $this->config = $config;
        $this->api = $api;
        $this->logger = $logger;
        $this->messageManager = $context->getMessageManager();
        $this->resultRedirectFactory = $resultRedirectFactory;
        parent::__construct($context);
    }

    public function execute()
    {
        try {
            $postData = $this->httpRequest->getPost()->toArray();
            $storeId = $postData['store_id'];
            $appkey = $this->config->getAppkey($storeId);
            $secret = $this->config->getSecret($storeId);

            if (($secret == null) || ($appkey == null)) {
                $this->messageManager->addError(__("Please enter valid APPKEY and/or SECRET"));
                return;
            }

            $token = $this->api->oauthAuthentication($storeId);
            if ($token) {
                $this->messageManager->addError(__("Please make sure that APPKEY & SECRET provided by you are correct"));
                return;
            }
        } catch (\Exception $e) {
            $this->logger->addDebug("Yotpo Index Action Error : $e");
        }
    }
}