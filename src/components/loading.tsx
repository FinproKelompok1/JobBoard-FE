'use client'
import { useState, useEffect } from "react";

export default function LoadingPage({ isLoading = true }) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2866 2038"
            className="w-64 h-64"
          >
            {/* Background glow effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            {/* Complete logo path */}
            <path
              d="M 1326.660 1.987 C 1296.948 7.346, 1272.019 25.954, 1258.576 52.806 C 1255.024 59.901, 1224.346 164.819, 977.885 1012.750 C 950.188 1108.037, 927.296 1185.997, 927.014 1185.993 C 926.731 1185.989, 922.920 1177.551, 918.545 1167.243 C 908.826 1144.342, 885.783 1098.354, 872.792 1075.928 C 808.874 965.588, 725.288 871.222, 622.776 793.666 L 604.052 779.500 808.788 779.248 L 1013.524 778.995 1039.937 688.248 C 1054.464 638.336, 1066.549 596.484, 1066.793 595.242 L 1067.236 592.984 572.868 593.242 L 78.500 593.500 70.500 595.751 C 58.863 599.026, 43.665 606.746, 34.795 613.887 C 10.497 633.449, -2.809 666.105, 0.930 697 C 4.743 728.506, 24.074 755.707, 52.500 769.566 C 64.490 775.413, 73.051 777.455, 96.140 779.977 C 160.590 787.016, 218.169 799.425, 277.104 818.977 C 432.597 870.559, 566.528 965.894, 661.364 1092.500 C 687.054 1126.796, 709.922 1163.707, 729.514 1202.500 C 791.459 1325.154, 816.603 1457.143, 804.858 1598 L 803.732 1611.500 761.298 1757.500 C 737.959 1837.800, 717.767 1907.550, 716.428 1912.500 C 709.920 1936.557, 713.273 1961.323, 726.210 1984.754 C 749.656 2027.219, 796.759 2044.046, 868 2035.406 C 886.517 2033.160, 928.805 2024.373, 942.093 2020.010 C 948.480 2017.912, 957.181 2014.591, 961.427 2012.629 C 965.673 2010.667, 1073.342 1954.294, 1200.690 1887.356 C 1415.227 1774.588, 1432.437 1765.727, 1435.015 1766.700 C 1436.546 1767.277, 1540.556 1821.754, 1666.149 1887.759 C 1791.742 1953.765, 1897.200 2009.115, 1900.500 2010.760 C 1919.463 2020.215, 1945.901 2027.272, 1970.530 2029.455 L 1977.561 2030.078 1970.261 2022.414 C 1960.264 2011.919, 1953.436 2001.281, 1943.534 1980.774 C 1918.662 1929.260, 1891.273 1854.105, 1877.473 1799.500 C 1875.945 1793.450, 1874.200 1787.956, 1873.597 1787.290 C 1872.333 1785.896, 1540.582 1611.223, 1519.500 1600.852 C 1464.833 1573.957, 1403.644 1573.448, 1349.500 1599.435 C 1342.350 1602.867, 1253.025 1649.565, 1151 1703.207 C 1048.975 1756.850, 963.075 1801.962, 960.110 1803.457 L 954.721 1806.175 955.387 1803.838 C 966.259 1765.700, 978.061 1708.925, 984.034 1666.030 C 986.101 1651.184, 995.212 1619.520, 1209.533 882.326 C 1343.631 421.070, 1433.356 110.816, 1434.076 105.892 C 1439.670 67.634, 1418.737 28.369, 1383.288 10.623 C 1370.565 4.254, 1360.374 1.810, 1345 1.439 C 1337.575 1.260, 1329.322 1.507, 1326.660 1.987 M 1431.951 8.697 C 1455.284 33.931, 1467.504 66.947, 1465.705 99.897 C 1465.387 105.729, 1464.612 112.975, 1463.982 116 C 1462.985 120.795, 1445.648 182.149, 1444.293 185.680 C 1443.912 186.671, 1445.121 187.004, 1449.143 187.015 L 1454.500 187.029 1508.923 374.515 L 1563.346 562 1660.240 562 C 1752.063 562, 1757.106 561.908, 1756.586 560.250 C 1756.284 559.288, 1723.592 446.900, 1683.938 310.500 C 1610.516 57.952, 1609.088 53.324, 1600.912 41.327 C 1589.331 24.334, 1570.622 10.909, 1549.288 4.285 L 1540.500 1.556 1482.618 1.225 L 1424.736 0.895 1431.951 8.697 M 1325.505 594.244 C 1325.265 594.935, 1313.330 636, 1298.984 685.500 C 1284.638 735, 1272.667 776.287, 1272.383 777.249 C 1271.891 778.912, 1296.084 779.010, 1766.907 779.249 L 2261.948 779.500 2243.224 793.666 C 2117.767 888.582, 2018.492 1011.465, 1954.945 1150.500 C 1947.877 1165.963, 1938.482 1181.816, 1937.166 1180.500 C 1936.944 1180.277, 1912.589 1096.936, 1883.044 995.297 L 1829.326 810.500 1732.663 810.245 C 1673.271 810.088, 1636 810.350, 1636 810.924 C 1636 811.438, 1690.908 1000.723, 1758.017 1231.559 C 1872.208 1624.342, 1880.164 1652.198, 1882.053 1665.880 C 1896.271 1768.837, 1928.542 1877.556, 1971.763 1968.112 C 1980.351 1986.104, 1985.145 1993.333, 1994.939 2003.061 C 2015.912 2023.891, 2046.402 2033.546, 2075.295 2028.508 C 2122.084 2020.348, 2155.237 1978.990, 2152.657 1932 C 2151.955 1919.211, 2156.237 1934.792, 2104.697 1757.500 C 2062.259 1611.518, 2062.254 1611.498, 2061.110 1598 C 2055.238 1528.674, 2058.878 1457.214, 2071.624 1391.618 C 2095.886 1266.748, 2150.970 1153.375, 2235.974 1053.354 C 2251.472 1035.117, 2293.870 992.190, 2311.500 976.884 C 2439.615 865.660, 2594.475 799.134, 2769.860 779.977 C 2793.610 777.382, 2801.646 775.406, 2814.500 768.996 C 2842.772 754.898, 2861.520 727.879, 2865.144 696.010 C 2867.131 678.536, 2864.275 662.545, 2856.121 645.500 C 2850.311 633.353, 2841.575 622.234, 2831.428 614.071 C 2822.614 606.980, 2806.738 598.879, 2795.500 595.737 L 2787.500 593.500 2056.721 593.244 C 1470.929 593.039, 1325.855 593.237, 1325.505 594.244"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="15000"
              strokeDashoffset="15000"
              className="animate-draw"
              filter="url(#glow)"
            />

            {/* Multiple gradient definitions for animation */}
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#4A90E2">
                  <animate
                    attributeName="stop-color"
                    values="#4A90E2; #6366f1; #4A90E2"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="100%" stopColor="#E74694">
                  <animate
                    attributeName="stop-color"
                    values="#E74694; #ec4899; #E74694"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Website Name with Animation */}
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            <span className="text-[#4A90E2]">Talent</span>
            <span className="text-[#E74694]">Bridge</span>
          </h1>
          <p className="mt-2 text-gray-400">
            Bridging dreams to reality
          </p>
        </div>

        <style jsx>{`
          @keyframes draw {
            0% {
              stroke-dashoffset: 15000;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          .animate-draw {
            animation: draw 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return null;
}