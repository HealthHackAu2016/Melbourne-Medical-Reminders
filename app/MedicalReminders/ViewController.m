//
//  ViewController.m
//  MedicalReminders
//
//  Created by John Lyons on 15/10/2016.
//  Copyright © 2016 John Lyons. All rights reserved.
//

#import "ViewController.h"

static NSString *const kKeychainItemName = @"Google Calendar API";
static NSString *const kClientID = @"ENTER YOUR CLIENTS ID";

@implementation ViewController

@synthesize service = _service;
@synthesize output = _output;



- (void)loadView {
    
    
    CGRect r=[[UIScreen mainScreen] bounds];
     width=r.size.width;
    
    UIView* contentView = [[UIView alloc] initWithFrame:r];
    contentView.backgroundColor=[UIColor whiteColor];
    self.view = contentView;

    // Initialize the Google Calendar API service & load existing credentials from the keychain if available.
    self.service = [[GTLServiceCalendar alloc] init];
    self.service.authorizer =
    [GTMOAuth2ViewControllerTouch authForGoogleFromKeychainForName:kKeychainItemName
                                                          clientID:kClientID
                                                      clientSecret:nil];

    
    
    //EEEE, MMM d
    NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
    [formatter setDateFormat:@"EEEE, dd MMM"];
    
    UILabel* budg1Lbl = [[UILabel alloc] initWithFrame:CGRectMake(0,00,width-0,150)];
    budg1Lbl.adjustsFontSizeToFitWidth=YES;
    budg1Lbl.text=[formatter stringFromDate:[NSDate date]];
    budg1Lbl.textAlignment=NSTextAlignmentCenter;
    budg1Lbl.textColor = [UIColor whiteColor ];
    budg1Lbl.backgroundColor=[UIColor darkGrayColor];
    budg1Lbl.font=[UIFont fontWithName:@"HelveticaNeue-Light" size:60];
    [self.view addSubview:budg1Lbl];

    
    
    
    
}/*
// When the view loads, create necessary subviews, and initialize the Google Calendar API service.
- (void)viewDidLoad {
    [super viewDidLoad];
    
    // Create a UITextView to display output.
    self.output = [[UITextView alloc] initWithFrame:self.view.bounds];
    self.output.editable = false;
    self.output.contentInset = UIEdgeInsetsMake(20.0, 0.0, 20.0, 0.0);
    self.output.autoresizingMask = UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth;
    [self.view addSubview:self.output];
    
   }*/

// When the view appears, ensure that the Google Calendar API service is authorized, and perform API calls.
- (void)viewDidAppear:(BOOL)animated {
    if (!self.service.authorizer.canAuthorize) {
        // Not yet authorized, request authorization by pushing the login UI onto the UI stack.
        [self presentViewController:[self createAuthController] animated:YES completion:nil];
        
    } else {
        [self fetchEvents];
    }
}

// Construct a query and get a list of upcoming events from the user calendar. Display the
// start dates and event summaries in the UITextView.
- (void)fetchEvents {
    GTLQueryCalendar *query = [GTLQueryCalendar queryForEventsListWithCalendarId:@"primary"];
    query.maxResults = 20;
    query.timeMin = [GTLDateTime dateTimeWithDate:[NSDate date]
                                         timeZone:[NSTimeZone localTimeZone]];;
    query.singleEvents = YES;
    query.orderBy = kGTLCalendarOrderByStartTime;
    
    [self.service executeQuery:query
                      delegate:self
             didFinishSelector:@selector(displayResultWithTicket:finishedWithObject:error:)];
}


-(NSDate *)endOfDay:(NSDate *)date
{
    NSCalendar *calendar = [NSCalendar currentCalendar];
    NSDateComponents *components = [calendar components:NSYearCalendarUnit | NSMonthCalendarUnit | NSDayCalendarUnit fromDate:date];
    return [[calendar dateFromComponents:components] dateByAddingTimeInterval:24*3600];
}
- (void)displayResultWithTicket:(GTLServiceTicket *)ticket
             finishedWithObject:(GTLCalendarEvents *)events
                          error:(NSError *)error {
    if (error == nil) {
        
        
        for (UIView *testView in [self.view subviews]) {
            if (testView.tag>=1000) {
                [testView removeFromSuperview];
            }
        }
        
        
        NSMutableString *eventString = [[NSMutableString alloc] init];
        if (events.items.count > 0) {
            [eventString appendString:@"Upcoming 10 events:\n"];
            int count=0;
            
            NSDate* eod=[self endOfDay:[NSDate date]];
            
            NSDateFormatter *formatter = [[NSDateFormatter alloc] init];
            [formatter setDateFormat:@"h:mm a"];
            
            
            float starty=165;
            
            
            for (GTLCalendarEvent *event in events) {
                GTLDateTime *start = event.start.dateTime ?: event.start.date;
                GTLDateTime *end = event.end.dateTime ?: event.end.date;
                
                
                if ([start.date compare:eod] == NSOrderedAscending) {

                    
                    NSInteger since=[ end.date timeIntervalSinceDate:start.date];
                   // NSLog(@"date %@ %@ %i",start.date,end.date,(int)since);

                    
                    if (since==86400){
                        
                        UILabel* budg1Lbl = [[UILabel alloc] initWithFrame:CGRectMake(5,starty,width-10,160)];
                        budg1Lbl.adjustsFontSizeToFitWidth=YES;
                        budg1Lbl.text= event.summary;
                        budg1Lbl.textAlignment=NSTextAlignmentCenter;
                        budg1Lbl.numberOfLines =3;
                        budg1Lbl.tag=1000+count;
                        budg1Lbl.lineBreakMode = NSLineBreakByWordWrapping;
                        budg1Lbl.textColor = [UIColor blackColor ];
                            budg1Lbl.backgroundColor=[UIColor colorWithRed:0.85f green:0.85f blue:0.85f alpha:1.0f];
                        
                        budg1Lbl.font=[UIFont fontWithName:@"HelveticaNeue-Light" size:50];
                        [self.view addSubview:budg1Lbl];
                        
                        starty=starty+135;

                        
                    }
                }
                
            }
            
            
            for (GTLCalendarEvent *event in events) {
                GTLDateTime *start = event.start.dateTime ?: event.start.date;
                GTLDateTime *end = event.end.dateTime ?: event.end.date;

                
                if ([start.date compare:eod] == NSOrderedAscending) {
                    
                    
                    NSInteger since=[ end.date timeIntervalSinceDate:start.date];
                    NSLog(@"date %@ %@ %i",start.date,end.date,(int)since);
                    
                    
                    if (since==86400){
                        
                    } else {
                        
                       // NSLog(@"start %@ %@")
                        
                       NSString *startString = [formatter stringFromDate:[start date]];
                        /*NSString *startString =
                        [NSDateFormatter localizedStringFromDate:[start date]
                                                       dateStyle:NSDateFormatterShortStyle
                                                       timeStyle:NSDateFormatterShortStyle];
                        //[eventString appendFormat:@"%@ - %@\n", startString, event.summary];*/
                        
                        UILabel* budg1Lbl = [[UILabel alloc] initWithFrame:CGRectMake(5,starty,width-10,160)];
                        budg1Lbl.adjustsFontSizeToFitWidth=YES;
                        budg1Lbl.text=[@"" stringByAppendingFormat:@"%@ - %@", startString, event.summary];
                        budg1Lbl.textAlignment=NSTextAlignmentLeft;
                        budg1Lbl.numberOfLines =3;
                        budg1Lbl.tag=1000+count;
                        budg1Lbl.lineBreakMode = NSLineBreakByWordWrapping;
                        budg1Lbl.textColor = [UIColor blackColor ];
                        budg1Lbl.backgroundColor=[UIColor clearColor];
                        if (count%2==1){
                            
                            budg1Lbl.backgroundColor=[UIColor colorWithRed:0.95f green:0.95f blue:0.95f alpha:1.0f];
                        }
                        budg1Lbl.font=[UIFont fontWithName:@"HelveticaNeue-Light" size:50];
                        [self.view addSubview:budg1Lbl];

                        starty=starty+135;
                        
                        count++;
                        
                    }
                    
                }
            }
        } else {
            //[eventString appendString:@"No upcoming events found."];
        }
       // self.output.text = eventString;
        
        [self fetchEvents];
    } else {
        [self showAlert:@"Error" message:error.localizedDescription];
    }
}



// Creates the auth controller for authorizing access to Google Calendar API.
- (GTMOAuth2ViewControllerTouch *)createAuthController {
    GTMOAuth2ViewControllerTouch *authController;
    // If modifying these scopes, delete your previously saved credentials by
    // resetting the iOS simulator or uninstall the app.
    NSArray *scopes = [NSArray arrayWithObjects:kGTLAuthScopeCalendarReadonly, nil];
    authController = [[GTMOAuth2ViewControllerTouch alloc]
                      initWithScope:[scopes componentsJoinedByString:@" "]
                      clientID:kClientID
                      clientSecret:nil
                      keychainItemName:kKeychainItemName
                      delegate:self
                      finishedSelector:@selector(viewController:finishedWithAuth:error:)];
    return authController;
}

// Handle completion of the authorization process, and update the Google Calendar API
// with the new credentials.
- (void)viewController:(GTMOAuth2ViewControllerTouch *)viewController
      finishedWithAuth:(GTMOAuth2Authentication *)authResult
                 error:(NSError *)error {
    if (error != nil) {
        [self showAlert:@"Authentication Error" message:error.localizedDescription];
        self.service.authorizer = nil;
    }
    else {
        self.service.authorizer = authResult;
        [self dismissViewControllerAnimated:YES completion:nil];
    }
}

// Helper for showing an alert
- (void)showAlert:(NSString *)title message:(NSString *)message {
    UIAlertController *alert =
    [UIAlertController alertControllerWithTitle:title
                                        message:message
                                 preferredStyle:UIAlertControllerStyleAlert];
    UIAlertAction *ok =
    [UIAlertAction actionWithTitle:@"OK"
                             style:UIAlertActionStyleDefault
                           handler:^(UIAlertAction * action)
     {
         [alert dismissViewControllerAnimated:YES completion:nil];
     }];
    [alert addAction:ok];
    [self presentViewController:alert animated:YES completion:nil];
    
}

@end
