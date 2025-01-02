"use client";

import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  legend: {
    show: false,
    position: "top",
    horizontalAlign: "left",
  },
  colors: ["#3C50E0", "#FF0000"],
  chart: {
    fontFamily: "Satoshi, sans-serif",
    height: 335,
    type: "area",
    dropShadow: {
      enabled: true,
      color: "#623CEA14",
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
    toolbar: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: "straight",
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: "#fff",
    strokeColors: ["#3056D3", "#FF0000"],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: "0px",
      },
    },
    min: 0,
    max: 10,
  },
};

const AuthChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    successLogins: { date: string; count: string }[];
    failedLogins: { date: string; count: string }[];
  }>({
    successLogins: [],
    failedLogins: [],
  });

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/auth');
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching auth data:', error);
      }
    };

    fetchAuthData();
  }, []);

  // Process data for chart
  const processedOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: chartData.successLogins.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      )
    }
  };

  const series = [
    {
      name: "Successful Logins",
      data: chartData.successLogins.map(item => Number(item.count)),
    },
    {
      name: "Failed Logins",
      data: chartData.failedLogins.map(item => Number(item.count)),
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Successful Logins</p>
              <p className="text-sm font-medium">Authentication Logs</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Failed Logins</p>
              <p className="text-sm font-medium">Authentication Logs</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="authChart" className="-ml-5">
          <ReactApexChart
            options={processedOptions}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthChart;