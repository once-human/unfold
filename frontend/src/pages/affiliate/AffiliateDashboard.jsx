import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart3, DollarSign, Link, Users } from "lucide-react"
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { TabView, TabPanel } from 'primereact/tabview'
import { AffiliateSidebar } from "./AffiliateSidebar"
import ReferralTable from "./ReferralTable"
import PayoutHistory from "./PayoutHistory"
import { MarketingAssets } from "./MarketingAssets"
import BankDetailsForm from "./BankDetailsForm"
import Layout from "../../components/Layout"

const AffiliateDashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = {
          id: "user123",
          name: "John Doe",
          email: "john@example.com",
          plan: "premium",
          hasAccess: true,
        }
        setUser(userData)
        if (!userData.hasAccess) navigate("/upgrade")
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchUser()
  }, [navigate])

  const affiliateData = {
    totalReferrals: 42,
    totalSales: "$4,250.00",
    totalCommission: "$850.00",
    referralLink: "https://yoursite.com/ref/john123",
  }

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(affiliateData.referralLink)
    alert("Referral link copied to clipboard!")
  }

  return (
    <Layout>
    <div className="flex min-h-screen flex-col md:flex-row bg-gray-50">
      <AffiliateSidebar />

      <div className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Affiliate Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back, <span className="font-semibold text-black">{user?.name}</span>. Here's your affiliate performance overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Total Referrals",
              value: affiliateData.totalReferrals,
              icon: <Users className="h-5 w-5 text-blue-500" />,
              change: "+12%",
            },
            {
              label: "Total Sales",
              value: affiliateData.totalSales,
              icon: <BarChart3 className="h-5 w-5 text-green-500" />,
              change: "+18%",
            },
            {
              label: "Total Commission",
              value: affiliateData.totalCommission,
              icon: <DollarSign className="h-5 w-5 text-yellow-500" />,
              change: "+15%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-600">{item.label}</h3>
                {item.icon}
              </div>
              <div className="text-2xl font-bold text-gray-800">{item.value}</div>
              <p className="text-xs text-green-500 mt-1">{item.change} from last month</p>
            </div>
          ))}
        </div>

        {/* Tab View */}
        <div className="mt-8">
          <TabView>
            <TabPanel header="Referrals">
              <div className="bg-white rounded-xl shadow p-6 mt-4 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Referrals</h2>
                <p className="text-sm text-gray-500 mb-4">
                  View all users who registered through your affiliate link.
                </p>
                <ReferralTable />
              </div>
            </TabPanel>

            <TabPanel header="Payouts">
              <div className="bg-white rounded-xl shadow p-6 mt-4 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex">Payout History</h2>
                <p className="text-sm text-gray-500 mb-4">View your commission payouts and pending amounts.</p>
                <PayoutHistory />
                <div className="mt-4 text-right">
                  <Button icon="pi pi-download" label="Download Statement" className="p-button-outlined" />
                </div>
              </div>
            </TabPanel>

            <TabPanel header="Referral Tools">
              <div className="grid gap-6 md:grid-cols-2 mt-4">
                {/* Referral Link */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Referral Link</h2>
                  <p className="text-sm text-gray-500 mb-4">Share this unique link to earn commissions.</p>
                  <div className="flex items-center gap-2">
                    <InputText
                      value={affiliateData.referralLink}
                      readOnly
                      className="w-full p-inputtext-sm"
                      style={{ backgroundColor: "#f9fafb" }}
                    />
                    <Button
                      icon={<Link className="h-4 w-4" />}
                      tooltip="Copy link"
                      className="p-button-text p-button-secondary"
                      onClick={handleCopyReferralLink}
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium mb-2 text-gray-700">Share your link</label>
                    <div className="flex flex-wrap gap-2">
                      {["Facebook", "Twitter", "LinkedIn", "Email"].map((platform, i) => (
                        <Button
                          key={platform}
                          label={platform}
                          icon="pi pi-share-alt"
                          severity={
                            platform === "Facebook"
                              ? "info"
                              : platform === "Twitter"
                              ? "secondary"
                              : platform === "LinkedIn"
                              ? "help"
                              : undefined
                          }
                          className="p-button-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marketing Assets */}
                <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Marketing Assets</h2>
                  <p className="text-sm text-gray-500 mb-4">Download banners, logos, and promotional content.</p>
                  <MarketingAssets />
                </div>
              </div>
            </TabPanel>

            <TabPanel header="Bank Details">
              <div className="bg-white rounded-xl shadow p-6 mt-4 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Bank Details</h2>
                <p className="text-sm text-gray-500 mb-4">Update your bank information for commission payouts.</p>
                <BankDetailsForm />
              </div>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default AffiliateDashboard
