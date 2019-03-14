<?php 
namespace Integration\Yotpo\Plugin\Block;


use Magento\Framework\Data\Tree\NodeFactory;
use Magento\Framework\UrlInterface;
class Topmenu
{
    protected $nodeFactory;
    protected $urlBuilder;

    function __construct(
        NodeFactory $nodeFactory,
        UrlInterface $urlBuilder
    )
    {
        $this->nodeFactory = $nodeFactory;
        $this->urlBuilder = $urlBuilder;
    }

    public function beforeGetHtml(
        \Magento\Theme\Block\Html\Topmenu $subject, 
        $outermostClass, 
        $childrenWrapClass, 
        $limit
    )
    {
        $reviewNode = $this->nodeFactory->create(
            [
                'data' => $this->getNodeData(),
                'idField' => 'root',
                'tree' => $subject->getMenu()->getTree()
            ]
        );

        $subject->getMenu()->addChild($reviewNode);

        return [$outermostClass, $childrenWrapClass, $limit];
    }

    public function getNodeData()
    {
        // $active = strpos($this->)
         return [
            'name' => __('Yotpo Reviews'),
            'id' => 'yotpoReviews',
            'url' => $this->urlBuilder->getUrl('yotpo/reviews'),
            'is_active' => false
         ];
    }
}