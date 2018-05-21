//
//  NTESLinkAttachment.h
//  NIM
//
//  Created by hnbwyh on 2018/5/16.
//  Copyright © 2018年 Netease. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "NTESCustomAttachmentDefines.h"

@interface NTESLinkAttachment : NSObject<NIMCustomAttachment,NTESCustomAttachmentInfo>

// 标题
@property (nonatomic, copy) NSString *title;

// 点击跳转的链接地址
@property (nonatomic, copy) NSString *linkUrl;

// 图片
@property (nonatomic, copy) NSString *imageUrl;

// 描述
@property (nonatomic, copy) NSString *describe;


@end
