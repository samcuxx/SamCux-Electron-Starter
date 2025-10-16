import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { MessageCircle, Send, Star, Bug, Lightbulb, Heart } from 'lucide-react'

export function FeedbackPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
          <p className="text-muted-foreground">Help us improve WinCux with your feedback</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Send Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Feedback Type</label>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="outline" size="sm">
                  <Bug className="w-4 h-4 mr-2" />
                  Bug Report
                </Button>
                <Button variant="outline" size="sm">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Feature Request
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  General
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                placeholder="Brief description of your feedback"
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-2"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                placeholder="Please describe your feedback in detail..."
                rows={4}
                className="w-full px-3 py-2 border border-input rounded-md bg-background mt-2 resize-none"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anonymous" />
                <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                  Send anonymously
                </label>
              </div>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Rate WinCux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-8 h-8 text-yellow-400 fill-current cursor-pointer hover:scale-110 transition-transform"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">How would you rate your experience with WinCux?</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ease of use</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Performance</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Design</span>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full">Submit Rating</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: 'Feature Request',
                message: 'Would love to see more wallpaper categories',
                date: '2024-01-15',
                status: 'under-review',
              },
              {
                type: 'Bug Report',
                message: 'Download progress not showing correctly',
                date: '2024-01-14',
                status: 'fixed',
              },
              {
                type: 'General',
                message: 'Great app! Love the interface design',
                date: '2024-01-13',
                status: 'acknowledged',
              },
            ].map((feedback, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{feedback.type}</Badge>
                  <span className="text-sm">{feedback.message}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      feedback.status === 'fixed'
                        ? 'default'
                        : feedback.status === 'under-review'
                          ? 'secondary'
                          : 'outline'
                    }
                  >
                    {feedback.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{feedback.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
