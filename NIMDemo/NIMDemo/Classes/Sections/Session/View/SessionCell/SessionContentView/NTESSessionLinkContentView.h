//
//  NTESSessionLinkContentView.h
//  NIM
//
//  Created by hnbwyh on 2018/5/16.
//  Copyright © 2018年 Netease. All rights reserved.
//

#import "NIMSessionMessageContentView.h"

static NSString *const NIMDemoEventNameLinkingPacket = @"NIMDemoEventNameLinkingPacket"; //自定义消息图文链接

@interface NTESSessionLinkContentView : NIMSessionMessageContentView

// 根据宽度，字体和文本内容获取高度
+ (CGFloat)getHeightByWidth:(CGFloat)width title:(NSString *)title font:(UIFont *)font;

@end
