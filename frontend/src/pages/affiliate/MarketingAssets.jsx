import React from "react"
import { FaDownload } from "react-icons/fa"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material"

// Mock marketing assets
const assets = {
  banners: [
    {
      id: "banner-1",
      name: "Horizontal Banner",
      dimensions: "728x90",
      thumbnail: "/placeholder.svg?height=90&width=728",
    },
    {
      id: "banner-2",
      name: "Square Banner",
      dimensions: "300x250",
      thumbnail: "/placeholder.svg?height=250&width=300",
    },
    {
      id: "banner-3",
      name: "Vertical Banner",
      dimensions: "160x600",
      thumbnail: "/placeholder.svg?height=300&width=160",
    },
  ],
  logos: [
    {
      id: "logo-1",
      name: "Full Color Logo",
      format: "PNG",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "logo-2",
      name: "White Logo",
      format: "PNG",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "logo-3",
      name: "Icon Only",
      format: "SVG",
      thumbnail: "/placeholder.svg?height=100&width=100",
    },
  ],
  content: [
    {
      id: "content-1",
      name: "Email Template",
      type: "HTML",
    },
    {
      id: "content-2",
      name: "Social Media Post",
      type: "Text",
    },
    {
      id: "content-3",
      name: "Product Description",
      type: "Text",
    },
  ],
}

export function MarketingAssets() {
  const [tab, setTab] = React.useState("banners")

  const handleChange = (event, newValue) => {
    setTab(newValue)
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Banners" value="banners" />
        <Tab label="Logos" value="logos" />
        <Tab label="Content" value="content" />
      </Tabs>

      {tab === "banners" && (
        <Grid container spacing={2} mt={2}>
          {assets.banners.map((banner) => (
            <Grid item xs={12} sm={6} key={banner.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    <img
                      src={banner.thumbnail}
                      alt={banner.name}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle1">{banner.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {banner.dimensions}
                      </Typography>
                    </Box>
                    <Button size="small" variant="outlined" startIcon={<FaDownload />}>
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === "logos" && (
        <Grid container spacing={2} mt={2}>
          {assets.logos.map((logo) => (
            <Grid item xs={12} sm={4} key={logo.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      height: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <img
                      src={logo.thumbnail}
                      alt={logo.name}
                      style={{ maxHeight: 80, maxWidth: 80, objectFit: "contain" }}
                    />
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="subtitle1">{logo.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {logo.format}
                      </Typography>
                    </Box>
                    <Button size="small" variant="outlined" startIcon={<FaDownload />}>
                      Download
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tab === "content" && (
        <Box mt={2}>
          {assets.content.map((content) => (
            <Card key={content.id} sx={{ mb: 2 }}>
              <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle1">{content.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {content.type}
                  </Typography>
                </Box>
                <Button size="small" variant="outlined" startIcon={<FaDownload />}>
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
