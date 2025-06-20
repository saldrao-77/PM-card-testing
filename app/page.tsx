"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import {
  DollarSign,
  FileText,
  Mail,
  Receipt,
  Settings,
  Eye,
  Download,
  Building,
  CheckCircle,
  AlertCircle,
  Zap,
  ExternalLink,
  FolderSyncIcon as Sync,
  Database,
  FileSpreadsheet,
  Send,
  Clock,
  MoreVertical,
  CreditCard,
  TrendingUp,
} from "lucide-react"

interface Card {
  id: string
  number: string
  holder: string
  balance: number
  status: string
}

interface Activity {
  type: string
  description: string
  amount: number
  date: string
}

interface Transaction {
  id: string
  date: string
  vendor: string
  amount: number
  category: string
  status: string
  receipt: boolean
}

interface Property {
  id: string
  name: string
  address: string
  totalBalance: number
  cardCount: number
  pendingBills: number
  trustBalance: number
  lastSync: string
  qboStatus: string
  reconciliationStatus: string
  pendingTransactions: number
  lastReport: string
  ownerEmail: string
  cards: Card[]
  recentActivity: Activity[]
  transactions: Transaction[]
}

export default function PMFinancialDashboard() {
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const properties: Property[] = [
    {
      id: "stanford",
      name: "Stanford GSB",
      address: "655 Knight Way, Stanford, CA",
      totalBalance: 1250.0,
      cardCount: 2,
      pendingBills: 3,
      trustBalance: 15420.5,
      lastSync: "2 hours ago",
      qboStatus: "synced",
      reconciliationStatus: "balanced",
      pendingTransactions: 5,
      lastReport: "Jan 15, 2024",
      ownerEmail: "owner@stanford.edu",
      cards: [
        { id: "1", number: "**** 4532", holder: "John Smith", balance: 635.0, status: "active" },
        { id: "2", number: "**** 7891", holder: "Sarah Johnson", balance: 615.0, status: "active" },
      ],
      recentActivity: [
        { type: "expense", description: "Home Depot purchase", amount: 635.0, date: "2 hours ago" },
        { type: "payment", description: "Trust transfer", amount: 1200.0, date: "1 day ago" },
        { type: "report", description: "Monthly statement sent", amount: 0, date: "3 days ago" },
      ],
      transactions: [
        {
          id: "1",
          date: "2024-01-15",
          vendor: "Home Depot",
          amount: 635.0,
          category: "Repairs & Maintenance",
          status: "pending",
          receipt: true,
        },
        {
          id: "2",
          date: "2024-01-14",
          vendor: "Trader Joe's",
          amount: 51.91,
          category: "Office Supplies",
          status: "reconciled",
          receipt: true,
        },
      ],
    },
    {
      id: "sunnyvale",
      name: "Sunnyvale 432",
      address: "432 Sunnyvale Ave, Sunnyvale, CA",
      totalBalance: 2991.25,
      cardCount: 2,
      pendingBills: 5,
      trustBalance: 28750.75,
      lastSync: "5 minutes ago",
      qboStatus: "synced",
      reconciliationStatus: "balanced",
      pendingTransactions: 8,
      lastReport: "Jan 10, 2024",
      ownerEmail: "owner@sunnyvale.com",
      cards: [
        { id: "3", number: "**** 2345", holder: "Mike Chen", balance: 1200.0, status: "active" },
        { id: "4", number: "**** 6789", holder: "Lisa Wong", balance: 1791.25, status: "active" },
      ],
      recentActivity: [
        { type: "expense", description: "Lowe's purchase", amount: 289.5, date: "1 hour ago" },
        { type: "expense", description: "Office Depot", amount: 125.75, date: "6 hours ago" },
        { type: "sync", description: "QuickBooks sync", amount: 0, date: "5 minutes ago" },
      ],
      transactions: [
        {
          id: "3",
          date: "2024-01-14",
          vendor: "Lowe's",
          amount: 289.5,
          category: "Repairs & Maintenance",
          status: "pending",
          receipt: false,
        },
        {
          id: "4",
          date: "2024-01-13",
          vendor: "Office Depot",
          amount: 125.75,
          category: "Office Supplies",
          status: "reconciled",
          receipt: true,
        },
      ],
    },
    {
      id: "downtown",
      name: "Downtown Lofts",
      address: "123 Market St, San Francisco, CA",
      totalBalance: 450.0,
      cardCount: 1,
      pendingBills: 2,
      trustBalance: 12300.0,
      lastSync: "1 hour ago",
      qboStatus: "pending",
      reconciliationStatus: "variance",
      pendingTransactions: 3,
      lastReport: "Jan 8, 2024",
      ownerEmail: "owner@downtownlofts.com",
      cards: [{ id: "5", number: "**** 9876", holder: "Alex Rodriguez", balance: 450.0, status: "active" }],
      recentActivity: [
        { type: "expense", description: "Ace Hardware", amount: 89.99, date: "3 hours ago" },
        { type: "alert", description: "Trust reconciliation variance", amount: 0, date: "1 day ago" },
      ],
      transactions: [
        {
          id: "5",
          date: "2024-01-12",
          vendor: "Ace Hardware",
          amount: 89.99,
          category: "Repairs & Maintenance",
          status: "pending",
          receipt: true,
        },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Synced
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "balanced":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Balanced
          </Badge>
        )
      case "variance":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <AlertCircle className="h-3 w-3 mr-1" />
            Variance
          </Badge>
        )
      case "reconciled":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Reconciled</Badge>
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "expense":
        return <Receipt className="h-4 w-4 text-red-400" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-green-400" />
      case "report":
        return <FileText className="h-4 w-4 text-blue-400" />
      case "sync":
        return <Sync className="h-4 w-4 text-purple-400" />
      case "alert":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const handlePayBills = (property: Property) => {
    setSelectedProperty(property)
    setPaymentDialogOpen(true)
  }

  const handleGenerateReport = (property: Property) => {
    setSelectedProperty(property)
    setReportDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-pink-500">Job Vault</h1>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Financial Dashboard
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Zap className="h-3 w-3 mr-1" />
                QuickBooks Ready
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Database className="h-4 w-4 mr-2" />
                Sync All
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${properties.reduce((sum, prop) => sum + prop.totalBalance, 0).toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">Across {properties.length} properties</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Trust Balance</CardTitle>
              <Building className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${properties.reduce((sum, prop) => sum + prop.trustBalance, 0).toFixed(2)}
              </div>
              <p className="text-xs text-gray-400">Available funds</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Synced Transactions</CardTitle>
              <Database className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">98%</div>
              <p className="text-xs text-gray-400">Export-ready transactions</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Actions</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {properties.reduce((sum, prop) => sum + prop.pendingBills, 0)}
              </div>
              <p className="text-xs text-gray-400">Bills to process</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Status Banner */}
        <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Integration-Ready Financial Management</h3>
                  <p className="text-gray-400">
                    Fully export-ready for your accounting and software systems, including QuickBooks, AppFolio,
                    Buildium, Yardi, and more.
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Integrations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Properties</h2>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export All to Buildium
              </Button>
            </div>
          </div>

          {properties.map((property) => (
            <Card key={property.id} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Building className="h-5 w-5 text-blue-400" />
                    <div>
                      <CardTitle className="text-white text-xl">{property.name}</CardTitle>
                      <CardDescription className="text-gray-400">{property.address}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Outstanding</div>
                      <div className="text-lg font-bold text-white">${property.totalBalance.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Trust Balance</div>
                      <div className="text-lg font-bold text-green-400">${property.trustBalance.toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {getStatusBadge(property.qboStatus)}
                      {getStatusBadge(property.reconciliationStatus)}
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handlePayBills(property)} className="bg-green-600 hover:bg-green-700">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pay Bills
                      </Button>
                      <Button
                        onClick={() => handleGenerateReport(property)}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Report
                      </Button>

                      {/* Property Details Dropdown */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80 bg-gray-900 border-gray-700 text-white">
                          <DropdownMenuLabel className="text-gray-300">
                            {property.name} - Quick Details
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />

                          {/* Cards Section */}
                          <div className="p-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <CreditCard className="h-4 w-4 text-blue-400" />
                              <span className="text-sm font-medium text-gray-300">
                                Active Cards ({property.cardCount})
                              </span>
                            </div>
                            <div className="space-y-1 ml-6">
                              {property.cards.map((card) => (
                                <div key={card.id} className="flex justify-between items-center text-xs">
                                  <span className="text-gray-400">
                                    {card.number} - {card.holder}
                                  </span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-white">${card.balance.toFixed(2)}</span>
                                    {getStatusBadge(card.status)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <DropdownMenuSeparator className="bg-gray-700" />

                          {/* Financial Summary */}
                          <div className="p-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <TrendingUp className="h-4 w-4 text-green-400" />
                              <span className="text-sm font-medium text-gray-300">Financial Summary</span>
                            </div>
                            <div className="space-y-1 ml-6 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pending Bills:</span>
                                <span className="text-white">{property.pendingBills}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pending Transactions:</span>
                                <span className="text-white">{property.pendingTransactions}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last QBO Sync:</span>
                                <span className="text-white">{property.lastSync}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Report:</span>
                                <span className="text-white">{property.lastReport}</span>
                              </div>
                            </div>
                          </div>

                          <DropdownMenuSeparator className="bg-gray-700" />

                          {/* Recent Activity */}
                          <div className="p-2">
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="h-4 w-4 text-purple-400" />
                              <span className="text-sm font-medium text-gray-300">Recent Activity</span>
                            </div>
                            <div className="space-y-2 ml-6">
                              {property.recentActivity.slice(0, 3).map((activity, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  {getActivityIcon(activity.type)}
                                  <div className="flex-1">
                                    <div className="text-white">{activity.description}</div>
                                    <div className="text-gray-400">{activity.date}</div>
                                  </div>
                                  {activity.amount > 0 && (
                                    <span className="text-white">${activity.amount.toFixed(2)}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          <DropdownMenuSeparator className="bg-gray-700" />

                          {/* Quick Actions */}
                          <DropdownMenuItem
                            className="text-gray-300 hover:bg-gray-800 cursor-pointer"
                            onClick={() => {
                              setExpandedProperty(expandedProperty === property.id ? null : property.id)
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Full Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                            <Sync className="h-4 w-4 mr-2" />
                            Sync to QuickBooks
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                            <Sync className="h-4 w-4 mr-2" />
                            Sync to Buildium
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            Export to Buildium
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 cursor-pointer">
                            <Receipt className="h-4 w-4 mr-2" />
                            View All Receipts
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Expandable Full Details Section */}
              <Collapsible
                open={expandedProperty === property.id}
                onOpenChange={() => setExpandedProperty(expandedProperty === property.id ? null : property.id)}
              >
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <Tabs defaultValue="overview" className="w-full">
                      <TabsList className="bg-gray-800 border-gray-700 mb-6">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
                          Overview
                        </TabsTrigger>
                        <TabsTrigger value="transactions" className="data-[state=active]:bg-gray-700">
                          Transactions
                        </TabsTrigger>
                        <TabsTrigger value="accounting" className="data-[state=active]:bg-gray-700">
                          Accounting
                        </TabsTrigger>
                        <TabsTrigger value="reports" className="data-[state=active]:bg-gray-700">
                          Reports
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="bg-gray-800 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-white text-lg">Card Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Active Cards:</span>
                                <span className="text-white">{property.cardCount}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pending Bills:</span>
                                <span className="text-white">{property.pendingBills}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">This Month:</span>
                                <span className="text-white">${property.totalBalance.toFixed(2)}</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-white text-lg">Trust Account</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Available:</span>
                                <span className="text-green-400">${property.trustBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                {getStatusBadge(property.reconciliationStatus)}
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Reconciled:</span>
                                <span className="text-white">Today</span>
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-white text-lg">QuickBooks Sync</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                {getStatusBadge(property.qboStatus)}
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Last Sync:</span>
                                <span className="text-white">{property.lastSync}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Pending:</span>
                                <span className="text-white">{property.pendingTransactions} transactions</span>
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Button className="bg-blue-600 hover:bg-blue-700 h-16">
                            <div className="text-center">
                              <Sync className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-sm">Sync to QBO</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-16">
                            <div className="text-center">
                              <FileSpreadsheet className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-sm">Export CSV</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-16">
                            <div className="text-center">
                              <Receipt className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-sm">View Receipts</div>
                            </div>
                          </Button>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-16">
                            <div className="text-center">
                              <FileText className="h-5 w-5 mx-auto mb-1" />
                              <div className="text-sm">GL Report</div>
                            </div>
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="transactions" className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Export as Buildium CSV
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                              <FileSpreadsheet className="h-4 w-4 mr-2" />
                              Export for Yardi Import
                            </Button>
                          </div>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow className="border-gray-700">
                              <TableHead className="text-gray-300">Date</TableHead>
                              <TableHead className="text-gray-300">Vendor</TableHead>
                              <TableHead className="text-gray-300">Amount</TableHead>
                              <TableHead className="text-gray-300">Category</TableHead>
                              <TableHead className="text-gray-300">Receipt</TableHead>
                              <TableHead className="text-gray-300">Status</TableHead>
                              <TableHead className="text-gray-300">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {property.transactions.map((transaction) => (
                              <TableRow key={transaction.id} className="border-gray-700">
                                <TableCell className="text-white">{transaction.date}</TableCell>
                                <TableCell className="text-white">{transaction.vendor}</TableCell>
                                <TableCell className="text-white">${transaction.amount.toFixed(2)}</TableCell>
                                <TableCell className="text-white">{transaction.category}</TableCell>
                                <TableCell>
                                  {transaction.receipt ? (
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-red-400" />
                                  )}
                                </TableCell>
                                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                                <TableCell>
                                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                                    Edit
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TabsContent>

                      <TabsContent value="accounting" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card className="bg-gray-800 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-white">QuickBooks Integration</CardTitle>
                              <CardDescription className="text-gray-400">
                                Real-time sync with your accounting system
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Connection:</span>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Connected
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Last Sync:</span>
                                <span className="text-white">{property.lastSync}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Sync Progress:</span>
                                <div className="flex items-center space-x-2">
                                  <Progress value={85} className="w-20" />
                                  <span className="text-white text-sm">85%</span>
                                </div>
                              </div>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Sync className="h-4 w-4 mr-2" />
                                Sync to QuickBooks Now
                              </Button>
                            </CardContent>
                          </Card>

                          <Card className="bg-gray-800 border-gray-600">
                            <CardHeader>
                              <CardTitle className="text-white">Trust Ledger</CardTitle>
                              <CardDescription className="text-gray-400">3-way reconciliation status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Bank Balance:</span>
                                <span className="text-white">${property.trustBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Book Balance:</span>
                                <span className="text-white">${property.trustBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Owner Ledger:</span>
                                <span className="text-white">${property.trustBalance.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-gray-300">Status:</span>
                                {getStatusBadge(property.reconciliationStatus)}
                              </div>
                              <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                                <Eye className="h-4 w-4 mr-2" />
                                View Ledger Details
                              </Button>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Export Options */}
                        <Card className="bg-gray-800 border-gray-600">
                          <CardHeader>
                            <CardTitle className="text-white">Export Options</CardTitle>
                            <CardDescription className="text-gray-400">
                              Export data in formats compatible with your property management software
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                Buildium CSV
                              </Button>
                              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                AppFolio Format
                              </Button>
                              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                Yardi Import
                              </Button>
                              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                                <FileSpreadsheet className="h-4 w-4 mr-2" />
                                QuickBooks IIF
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="reports" className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-white">Owner Reporting</h3>
                          <Button
                            onClick={() => handleGenerateReport(property)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Generate & Email Report
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {[
                            {
                              name: "Monthly Statement",
                              description: "Complete monthly activity with GL details",
                              lastSent: property.lastReport,
                              status: "sent",
                            },
                            {
                              name: "Expense Summary",
                              description: "Categorized expense breakdown",
                              lastSent: "Jan 12, 2024",
                              status: "delivered",
                            },
                            {
                              name: "Trust Reconciliation",
                              description: "3-way trust account reconciliation",
                              lastSent: "Jan 16, 2024",
                              status: "opened",
                            },
                          ].map((report, index) => (
                            <Card key={index} className="bg-gray-800 border-gray-600">
                              <CardHeader>
                                <CardTitle className="text-white text-lg">{report.name}</CardTitle>
                                <CardDescription className="text-gray-400">{report.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Last Sent:</span>
                                    <span className="text-white">{report.lastSent}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Status:</span>
                                    {getStatusBadge(report.status)}
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">To:</span>
                                    <span className="text-white">{property.ownerEmail}</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="space-x-2">
                                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300">
                                  <Eye className="h-4 w-4 mr-2" />
                                  Preview
                                </Button>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  <Send className="h-4 w-4 mr-2" />
                                  Send Now
                                </Button>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </div>

        {/* Payment Dialog */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Pay Bills - {selectedProperty?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Process payment and automatically create accounting entries
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Payment Amount</Label>
                  <Input
                    defaultValue={selectedProperty?.totalBalance.toFixed(2)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Payment Method</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="trust">Trust Account Transfer</SelectItem>
                      <SelectItem value="operating">Operating Account</SelectItem>
                      <SelectItem value="check">Check Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Automation Options</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Auto-sync to QuickBooks</Label>
                      <p className="text-sm text-gray-400">Create journal entries automatically</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Update trust ledger</Label>
                      <p className="text-sm text-gray-400">Maintain 3-way reconciliation</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-gray-300">Email owner notification</Label>
                      <p className="text-sm text-gray-400">Send payment confirmation to owner</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Integration Ready</p>
                      <p className="text-sm text-gray-400">
                        This payment will be automatically formatted for export to Buildium, AppFolio, or Yardi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setPaymentDialogOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Dialog */}
        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate Owner Report - {selectedProperty?.name}</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create and email comprehensive owner statement
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">Report Period</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="current">Current Month</SelectItem>
                      <SelectItem value="last">Last Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-300">Owner Email</Label>
                  <Input
                    defaultValue={selectedProperty?.ownerEmail}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-300">Report Sections</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    "Transaction Summary",
                    "GL Account Details",
                    "Receipt Attachments",
                    "Trust Account Activity",
                    "Expense Categories",
                    "QuickBooks Export Data",
                  ].map((section) => (
                    <div key={section} className="flex items-center space-x-2">
                      <Switch id={section} defaultChecked />
                      <Label htmlFor={section} className="text-gray-300 text-sm">
                        {section}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-gray-800 border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Export-Ready Data Included</p>
                      <p className="text-sm text-gray-400">
                        Report includes formatted data for easy import into Buildium, AppFolio, or Yardi
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <DialogFooter className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setReportDialogOpen(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4 mr-2" />
                Email Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
