//
//  NTESSessionLinkContentView.m
//  NIM
//
//  Created by hnbwyh on 2018/5/16.
//  Copyright © 2018年 Netease. All rights reserved.
//

#import "NTESSessionLinkContentView.h"
#import "UIView+NTES.h"
#import "NTESLinkAttachment.h"
#import "NTESSessionUtil.h"
#import "UIImageView+WebCache.h"

CGFloat titleHeight = 40.f; // title高度
CGFloat imageHeight = 120.f;// 图片高度

@interface NTESSessionLinkContentView()

// 图文链接消息附件
@property (nonatomic,strong) NTESLinkAttachment *attachment;

@property (nonatomic,strong) UILabel *titleLabel;

@property (nonatomic,strong) UIImageView *imageView;

@property (nonatomic,strong) UILabel *describeLabel;

@end

@implementation NTESSessionLinkContentView

- (instancetype)initSessionMessageContentView{
    self = [super initSessionMessageContentView];
    if (self) {
        self.opaque = YES;
        
        _titleLabel = [[UILabel alloc] initWithFrame:CGRectZero];
        _imageView  = [[UIImageView alloc] initWithFrame:CGRectZero];
        _describeLabel = [[UILabel alloc] initWithFrame:CGRectZero];
    }
    return self;
}

- (void)refresh:(NIMMessageModel *)data
{
    [super refresh:data];
    NIMCustomObject *customObject = (NIMCustomObject*)data.message.messageObject;
    id attach = customObject.attachment;
    
    if ([attach isKindOfClass:[NTESLinkAttachment class]]) {
        self.attachment = (NTESLinkAttachment *)attach;
        
        self.titleLabel.text = self.attachment.title;
        [self addSubview:_titleLabel];
        
        if (self.attachment.imageUrl != nil) {
            NSURL *url = [NSURL URLWithString:self.attachment.imageUrl];
            // 默认图片 default_image，记得在 Images.xcassets 中添加
            [self.imageView sd_setImageWithURL:url placeholderImage:[UIImage imageNamed:@"default_image"]];
            [self.imageView sizeToFit];
            [self addSubview:_imageView];
        }
        if (self.attachment.describe != nil) {
            self.describeLabel.text = self.attachment.describe;
            [self addSubview:_describeLabel];
        }
    }
}

- (void)layoutSubviews{
    [super layoutSubviews];
    BOOL outgoing = self.model.message.isOutgoingMsg;
    
    UIEdgeInsets contentInsets = self.model.contentViewInsets;
    CGSize contentSize = [self.model contentSize:self.superview.width];
    CGFloat padding = 15;
    
    self.titleLabel.frame = CGRectMake(padding, contentInsets.left, contentSize.width - padding, titleHeight);
    self.titleLabel.font = [UIFont systemFontOfSize:14.0];
    self.titleLabel.numberOfLines = 1;
    
    // 详情描述距离
    CGFloat describeY = titleHeight;
    
    if (self.attachment != nil && self.attachment.imageUrl != nil) {
        self.imageView.frame = CGRectMake(
                                          contentInsets.left + contentInsets.right,
                                          titleHeight + contentInsets.top + 5,
                                          contentSize.width - (contentInsets.left + contentInsets.right), imageHeight);
        self.imageView.contentMode = UIViewContentModeScaleAspectFit;
        [self setBorderWithImageView:self.imageView top:TRUE left:FALSE bottom:TRUE right:FALSE borderColor:[UIColor lightGrayColor] borderWidth:0.3f];
        describeY += imageHeight + contentInsets.top * 3 + 5 ;
    }
    
    if (self.attachment != nil && self.attachment.describe != nil) {
        UIFont *font = [UIFont systemFontOfSize:12.0];
        self.describeLabel.font = font;
        self.describeLabel.numberOfLines = 3;
        CGFloat height = [NTESSessionLinkContentView getHeightByWidth:self.describeLabel.frame.size.width title:self.attachment.describe font:font];
        self.describeLabel.frame = CGRectMake(padding, describeY, contentSize.width - padding, height + padding);
    }
    
    // 发出去的消息
    if (outgoing)
    {
        self.titleLabel.textColor = [UIColor whiteColor];
        self.describeLabel.textColor = [UIColor whiteColor];
    }
    else
    {
        self.titleLabel.textColor = [UIColor blackColor];
        self.describeLabel.textColor = [UIColor grayColor];
    }
}

// 根据宽动态获取高度
+ (CGFloat)getHeightByWidth:(CGFloat)width title:(NSString *)title font:(UIFont *)font
{
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, width, 0)];
    label.text = title;
    label.font = font;
    label.numberOfLines = 0;
    [label sizeToFit];
    CGFloat height = label.frame.size.height;
    return height;
}

// 设置元素边框
-(void)setBorderWithImageView:(UIImageView *) imageView top:(BOOL)top left:(BOOL)left bottom:(BOOL)bottom right:(BOOL)right borderColor:(UIColor *)color borderWidth:(CGFloat)width
{
    // 垂直内边距
    CGFloat verticalPadding = 5.0f;
    if (top)
    {
        CALayer *layer = [CALayer layer];
        layer.frame = CGRectMake(0, -verticalPadding, imageView.frame.size.width, width);
        layer.backgroundColor = color.CGColor;
        [imageView.layer addSublayer:layer];
    }
    if (left)
    {
        CALayer *layer = [CALayer layer];
        layer.frame = CGRectMake(0, 0, width, imageView.frame.size.height);
        layer.backgroundColor = color.CGColor;
        [imageView.layer addSublayer:layer];
    }
    if (bottom)
    {
        CALayer *layer = [CALayer layer];
        layer.frame = CGRectMake(0, imageView.frame.size.height - width + verticalPadding, imageView.frame.size.width, width);
        layer.backgroundColor = color.CGColor;
        [imageView.layer addSublayer:layer];
    }
    if (right)
    {
        CALayer *layer = [CALayer layer];
        layer.frame = CGRectMake(imageView.frame.size.width - width, 0, width, imageView.frame.size.height);
        layer.backgroundColor = color.CGColor;
        [imageView.layer addSublayer:layer];
    }
}

- (void)onTouchUpInside:(id)sender
{
    if ([self.delegate respondsToSelector:@selector(onCatchEvent:)]) {
        NIMKitEvent *event = [[NIMKitEvent alloc] init];
        event.eventName = NIMDemoEventNameLinkingPacket;
        event.messageModel = self.model;
        event.data = self;
        [self.delegate onCatchEvent:event];
    }
}


@end
