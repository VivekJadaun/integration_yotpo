<?php
namespace Integration\Yotpo\Helper;

/**
 * 
 */
class ApiHelper
{
    const DEFAULT_TIMEOUT = 60;
    const COUNT = 100;
    const YOTPO_API_UNSECURE_URL = "http://api.yotpo.com";
    const YOTPO_API_SECURE_URL = "https://api.yotpo.com";
    const CREATE_REVIEW_ASYNC = "v1/widget/reviews";
    const CREATE_REVIEW_SYNC = "reviews/dynamic_create";
    const DOMAIN = 'http://www.mage.com';

    protected $config;
    protected $productRepository;
    protected $productCollection;
    protected $curl;
    protected $logger;
    protected $messageManager;

    public function __construct(
        \Integration\Yotpo\Block\Config $config,
        // \Magento\Catalog\Model\ProductFactory $productFactory,
        \Magento\Catalog\Model\ProductRepository $productRepository,
        \Magento\Catalog\Model\ResourceModel\Product\CollectionFactory $productCollectionFactory,
        \Magento\Framework\HTTP\Adapter\CurlFactory $curlFactory,
        \Magento\Framework\Message\ManagerInterface $messageManager,
        \Psr\Log\LoggerInterface $logger
    )
    {
        $this->config = $config;
        $this->productRepository = $productRepository;
        $this->productCollection = $productCollectionFactory->create();
        $this->curl = $curlFactory->create();
        $this->logger = $logger;
        $this->messageManager = $messageManager;
    }

    public function oauthAuthentication($storeId)
    {
        $appkey = $this->config->getAppkey($storeId);
        $secret = $this->config->getSecret($storeId);

        if ($appkey == null || $secret == null) {
            $this->messageManager->addSuccess("Missing APPKEY and/or SECRET!");
            return null;
        }

        $yotpo_auth_options = array('client_id' => $appkey, 'client_secret' => $secret, 'grant_type' => 'client_credentials');

        try {
            $response = $this->apiPostRequest('oauth/token', $yotpo_auth_options);
            if (!is_array($response)) {
                $this->messageManager->addSuccess("Error : no response received from api");
                return null;
            }

            $valid_response = is_array($response['body']) && array_key_exists('access_token', $response['body']);

            if (!$valid_response) {
                $this->messageManager->addError("Error : no access token received");
                return null;
            }
            return $response['body']['access_token'];
        } catch (\Exception $e) {
            $this->messageManager->addSuccess("Error during authentication: $e");
            return null;
        }
    }

    public function apiPostRequest($path, $data, $timeout = self::DEFAULT_TIMEOUT)
    {
        try {
            $config = array('timeout' => $timeout);
            $url = self::YOTPO_API_SECURE_URL . '/' . $path;
            $this->curl->setConfig($config);
            $this->curl->write(\Zend_Http_Client::POST, $url, '1.1', array('Content-Type: application/json'), json_encode($data));
            $response = $this->curl->read();
            $this->curl->close();
            return array(
                'code' => \Zend_Http_Response::extractCode($response),
                'body' => json_decode(\Zend_Http_Response::extractBody($response), true)
            );
        } catch (\Exception $e) {
            $this->messageManager->addSuccess("Yotpo Api POST Request Error : $e");
            return null;
        }
    }


    public function apiGetRequest($path, $timeout = self::DEFAULT_TIMEOUT)
    {
        try {
            $config = array('timeout' => $timeout);
            $url = self::YOTPO_API_SECURE_URL . '/' . $path;
            $this->curl->setConfig($config);
            $this->curl->write(\Zend_Http_Client::GET, $url, '1.1', array('Content-Type: application/json'));
            $response = $this->curl->read();
            $this->curl->close();
            return array(
                'code' => \Zend_Http_Response::extractCode($response), 
                'body' => json_decode(\Zend_Http_Response::extractBody($response), true)
            );
        } catch (\Exception $e) {
            $this->messageManager->addError("Yotpo Api GET Request Error : $e");
            return null;
        }
    }

    public function createReview($reviewData)
    {
        try {
            $response = $this->apiPostRequest(self::CREATE_REVIEW_ASYNC, $reviewData);
            $this->messageManager->addSuccess($response['code']);
            return $response;
        } catch (\Exception $e) {
            $this->messageManager->addError("Yotpo Review Error : $e");
        }
    }

    public function fetchAllReviews($storeId, $count = self::COUNT, $page = 1)
    {
        try {
            $appkey = $this->config->getAppkey($storeId);
            $utoken = $this->oauthAuthentication($storeId);
            $path = "v1/apps/$appkey/reviews?utoken=$utoken&count=$count&page=$page";
            $reviews = $this->apiGetRequest($path);
            return $reviews;
        } catch (\Exception $e) {
            $this->messageManager->addError("Error while fetching reviews collection: $e");            
        }
    }

    public function fetchProductReviews($storeId, $sku, $count = self::COUNT, $page = 1)
    {
        if (!$sku) {
            $this->messageManager->addError(__('Please provide valid product sku'));
            return;
        }
        try {
            $appkey = $this->config->getAppkey($storeId);
            $path = "v1/widget/$appkey/products/$sku/reviews.json?per_page=$count&page=$page";
            $reviews = $this->apiGetRequest($path);
            return $reviews;
        } catch (\Exception $e) {
            $this->messageManager->addError(__("Error while fetching review for product $sku : $e"));
        }
    }

    public function getBottomLine($storeId, $productSku = null, $page = 1, $count = 10)
    {
        $appkey = $this->config->getAppkey($storeId);
        
        if ($productSku) {
            $path = "products/$appkey/$productSku/bottomline";
        } else {
            $path = "v1/apps/$appkey/bottom_lines?count=$count&page=$page";
        }

        try {
            $bottomLine = $this->apiGetRequest($path); 
            return $bottomLine;
        } catch (\Exception $e) {
            $this->messageManager->addError(__('Error while retrieving bottom line for all products : $e'));
        }
    }
}