//
//  ViewController.h
//  MedicalReminders
//
//  Created by John Lyons on 15/10/2016.
//  Copyright © 2016 John Lyons. All rights reserved.
//
#import <UIKit/UIKit.h>

#import "GTMOAuth2ViewControllerTouch.h"
#import "GTLCalendar.h"

@interface ViewController : UIViewController{
    
    float width;
}

@property (nonatomic, strong) GTLServiceCalendar *service;
@property (nonatomic, strong) UITextView *output;

@end
