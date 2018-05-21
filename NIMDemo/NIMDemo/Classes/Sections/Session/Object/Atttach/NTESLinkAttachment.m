//
//  NTESLinkAttachment.m
//  NIM
//
//  Created by hnbwyh on 2018/5/16.
//  Copyright © 2018年 Netease. All rights reserved.
//

#import "NTESLinkAttachment.h"
#import "NTESSessionLinkContentView.h"

@implementation NTESLinkAttachment

- (NSString *)encodeAttachment
{
    NSDictionary *dict = @{
                           CMType : @(CustomMessageTypeLink),
                           CMData : @{
                                   CMLinkPacketTitle    : self.title,
                                   CMLinkPacketLinkUrl  : self.linkUrl,
                                   CMLinkPacketImageUrl : self.imageUrl,
                                   CMLinkPacketDescribe : self.describe
                                   }
                           };
    NSData *data = [NSJSONSerialization dataWithJSONObject:dict
                                                   options:0
                                                     error:nil];
    NSString *content = nil;
    if (data) {
        content = [[NSString alloc] initWithData:data
                                        encoding:NSUTF8StringEncoding];
    }
    return content;
}


- (NSString *)cellContent:(NIMMessage *)message{
    return @"NTESSessionLinkContentView";
}

- (CGSize)contentSize:(NIMMessage *)message cellWidth:(CGFloat)width{
    CGFloat w = 240.0f;
    CGFloat h = 40.0f;
    CGFloat padding = 3.0f * 3;
    if (self.imageUrl != nil) {
        h += 140.f;
    }
    if (self.describe != nil) {
        UIFont *font = [UIFont systemFontOfSize:12.0];
        CGFloat height = [NTESSessionLinkContentView getHeightByWidth:w - padding title:self.describe font:font];
        h += height + padding;
    }
    
    return CGSizeMake(w, h);
}

- (UIEdgeInsets)contentViewInsets:(NIMMessage *)message
{
    CGFloat bubblePaddingForImage    = 3.f;
    CGFloat bubbleArrowWidthForImage = 5.f;
    if (message.isOutgoingMsg) {
        return  UIEdgeInsetsMake(bubblePaddingForImage,bubblePaddingForImage,bubblePaddingForImage,bubblePaddingForImage + bubbleArrowWidthForImage);
    }else{
        return  UIEdgeInsetsMake(bubblePaddingForImage,bubblePaddingForImage + bubbleArrowWidthForImage, bubblePaddingForImage,bubblePaddingForImage);
    }
}

- (BOOL)canBeRevoked
{
    return YES;
}

- (BOOL)canBeForwarded
{
    return YES;
}

@end
