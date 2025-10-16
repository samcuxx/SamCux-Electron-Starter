import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Download, Trash2, FolderOpen, FileImage, Gauge } from 'lucide-react'

export function DownloadsPage() {
  const downloads = [
    {
      id: 1,
      name: 'Beautiful Landscape Wallpaper',
      type: 'wallpaper',
      size: '2.4 MB',
      status: 'completed',
      date: '2024-01-15',
    },
    {
      id: 2,
      name: 'System Monitor Skin',
      type: 'rainmeter',
      size: '1.2 MB',
      status: 'downloading',
      progress: 65,
    },
    {
      id: 3,
      name: 'Abstract Art Wallpaper',
      type: 'wallpaper',
      size: '3.1 MB',
      status: 'completed',
      date: '2024-01-14',
    },
    {
      id: 4,
      name: 'Weather Widget',
      type: 'rainmeter',
      size: '800 KB',
      status: 'failed',
      date: '2024-01-13',
    },
  ]

  const getTypeIcon = (type: string) => {
    return type === 'wallpaper' ? FileImage : Gauge
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default">Completed</Badge>
      case 'downloading':
        return <Badge variant="secondary">Downloading</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Downloads</h1>
          <p className="text-muted-foreground">Manage your downloaded wallpapers and Rainmeter skins</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <FolderOpen className="w-4 h-4 mr-2" />
            Open Folder
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        {downloads.map((download) => {
          const Icon = getTypeIcon(download.type)
          return (
            <Card key={download.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-muted rounded-lg">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{download.name}</h3>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{download.size}</span>
                        <span>{download.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {download.type}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {download.status === 'downloading' && download.progress && (
                      <div className="w-20">
                        <div className="bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${download.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{download.progress}%</span>
                      </div>
                    )}

                    {getStatusBadge(download.status)}

                    <div className="flex items-center space-x-1">
                      {download.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <FolderOpen className="w-3 h-3 mr-1" />
                          Open
                        </Button>
                      )}
                      {download.status === 'failed' && (
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Retry
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {downloads.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Download className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Downloads Yet</h3>
            <p className="text-muted-foreground mb-4">Download wallpapers and Rainmeter skins to see them here</p>
            <Button>Browse Wallpapers</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
