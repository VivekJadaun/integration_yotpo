<?php
namespace Integration\Yotpo\Observer;

use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Data\Tree\Node;

class Review implements ObserverInterface
{
    const SCOPE_STORES = \Magento\Store\Model\ScopeInterface::SCOPE_STORES;
    protected $context;
    protected $httpRequest;
    protected $httpResponse;
    protected $config;
    protected $api;
    protected $resultRedirectFactory;
    protected $logger;
    protected $storeManager;
    protected $configWriter;
    protected $cacheManager;
    protected $messageManager;
    protected $customerRepository;
    protected $productRepository;
    protected $voteCollection;
    protected $encryptor;
    // protected $urlInterface;

    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\App\Request\Http $httpRequest,
        \Magento\Framework\App\Response\Http $httpResponse,
        \Integration\Yotpo\Block\Config $config,
        \Integration\Yotpo\Helper\ApiHelper $api,
        \Magento\Framework\Controller\Result\RedirectFactory $resultRedirectFactory,
        \Psr\Log\LoggerInterface $logger,
        \Magento\Store\Model\StoreManagerInterface $storeManager,
        \Magento\Framework\App\Config\Storage\WriterInterface $configWriter,
        \Magento\Framework\App\Cache\Manager $cacheManager,
        \Magento\Review\Model\ReviewFactory $reviewFactory,
        \Magento\Customer\Api\CustomerRepositoryInterface $customerRepository,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        // \Magento\Catalog\Api\ProductRepositoryInterface $productRepository,
        \Magento\Review\Model\ResourceModel\Rating\Option\Vote\CollectionFactory $voteCollectionFactory,
        \Magento\Framework\Encryption\EncryptorInterface $encryptor
        // \Magento\Framework\UrlInterface $urlInterface
    )
    {
        $this->context = $context;
        $this->httpRequest = $httpRequest;
        $this->httpResponse = $httpResponse;
        $this->config = $config;
        $this->api = $api;
        $this->resultRedirectFactory = $resultRedirectFactory;
        $this->logger = $logger;
        $this->storeManager = $storeManager;
        $this->configWriter = $configWriter;
        $this->cacheManager = $cacheManager;
        $this->review = $reviewFactory->create();
        $this->messageManager = $context->getMessageManager();
        $this->customerRepository = $customerRepository;
        $this->productRepository = $productRepository;
        $this->voteCollection = $voteCollectionFactory->create();
        $this->encryptor = $encryptor;
        // $this->urlInterface = $urlInterface;
    }

    public function execute(Observer $observer)
    {
        try {
            
            $review = $observer->getEvent()->getObject();
            // $this->messageManager->addError(urldecode(http_build_query($review->toArray())));
            // $this->messageManager->addError($review->getData('ratings')[4]);
            $currentStoreId = $this->storeManager->getStore()->getId();
            $appkey = $this->config->getAppkey($currentStoreId);
            $secret = $this->config->getSecret($currentStoreId);
            if (($secret == null) || ($appkey == null)) {
                $this->messageManager->addError(__("Please enter valid APPKEY and/or SECRET"));
                return;
            }

            // $token = $this->api->oauthAuthentication($currentStoreId);
            // if ($token == null) {
            //     $this->messageManager->addError(__("Please make sure that APPKEY & SECRET provided by you are correct"));
            //     return;
            // }

            // $reviewVote = $this->voteCollection->setReviewFilter($review->getReviewId())->load()->fetchItem();
            $reviewedProduct = $this->productRepository->getById($review->getData('entity_pk_value'));
            $reviewer = $this->customerRepository->getById($review->getData('customer_id'));



            // $this->configWriter->save('catalog/review/allow_guest', '0', self::SCOPE_STORES, $currentStoreId);
            // $this->cacheManager->clean($this->cacheManager->getAvailableTypes());
            // $this->messageManager->addNotice(__("Guest reviews have been disabled."));

            $sku = $reviewedProduct->getSku();
            $product_title = $reviewedProduct->getName();
            $product_description = $reviewedProduct->getShortDescription();
            $product_url = $reviewedProduct->getProductUrl();
            $display_name = $reviewer->getFirstName() ?: $review->getNickname();
            $email = $reviewer->getEmail();
            $review_content = $review->getDetail();
            $review_title = $review->getTitle();
            $review_score = $review->getData('ratings')[4] ? ($review->getData('ratings')[4] % 15) : 1;

            $reviewData = array(
                "appkey" => $appkey,
                "sku" => $sku,
                "product_title" => $product_title,
                "product_description" => $product_description,
                "product_url" => $product_url,
                "display_name" => $display_name,
                "email" => $email,
                "review_content" => $review_content,
                "review_title" => $review_title,
                "review_score" => $review_score
            );
            // $this->messageManager->addNotice(urldecode(http_build_query($reviewData)));
            $response = $this->api->createReview($reviewData, $currentStoreId);

        } catch (\Exception $e) {
            $this->logger->addDebug(__("Error in Yotpo Integration Observer : $e"));
        }



    }
}