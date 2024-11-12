"use client"

import React, { useState } from 'react';

const ROICalculator = () => {
  const [inputs, setInputs] = useState({
    averageSalesValue: 2000,
    monthlyLeadVolume: 500,
    salesConversionRate: 1,
    setupCost: 15000,
    monthlyCost: 3000
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  // Calculate pipeline value (20% of Monthly Leads * Avg Sales Value)
  const pipelineValue = (inputs.monthlyLeadVolume * 0.20) * inputs.averageSalesValue;

  // Calculate basic outputs
  const monthlySales = (inputs.monthlyLeadVolume * (inputs.salesConversionRate / 100));
  const monthlyRevenue = monthlySales * inputs.averageSalesValue;
  const quarterlyRevenue = monthlyRevenue * 3;
  const yearlyRevenue = monthlyRevenue * 12;

  // Calculate profits
  const firstMonthProfit = monthlyRevenue - inputs.monthlyCost - inputs.setupCost;
  const firstQuarterProfit = (monthlyRevenue * 3) - (inputs.monthlyCost * 3) - inputs.setupCost;
  const yearlyProfit = (monthlyRevenue * 12) - (inputs.monthlyCost * 12) - inputs.setupCost;

  // Calculate breakeven
  const monthlyProfit = monthlyRevenue - inputs.monthlyCost;
  const monthsToBreakeven = Math.ceil(inputs.setupCost / monthlyProfit);
  const isBreakevenPossible = monthlyProfit > 0;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="py-8 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900 text-cyan-400 border border-cyan-500 rounded-lg shadow-lg shadow-cyan-500/20">
        <div className="border-b border-cyan-500/30 p-6">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            4-Bot AutoGrowth System ROI Calculator
          </h1>
        </div>
        
        <div className="p-6 space-y-8">
          {/* Input Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="averageSalesValue" className="block text-cyan-400">
                Average Sales Value ($)
              </label>
              <input
                type="number"
                id="averageSalesValue"
                name="averageSalesValue"
                value={inputs.averageSalesValue}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="monthlyLeadVolume" className="block text-cyan-400">
                Monthly Lead Volume
              </label>
              <input
                type="number"
                id="monthlyLeadVolume"
                name="monthlyLeadVolume"
                value={inputs.monthlyLeadVolume}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="salesConversionRate" className="block text-cyan-400">
                Sales Conversion Rate (%)
              </label>
              <input
                type="number"
                id="salesConversionRate"
                name="salesConversionRate"
                value={inputs.salesConversionRate}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.1"
                className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="setupCost" className="block text-cyan-400">
                One-time Setup Fee ($)
              </label>
              <input
                type="number"
                id="setupCost"
                name="setupCost"
                value={inputs.setupCost}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="monthlyCost" className="block text-cyan-400">
                Monthly Fee ($)
              </label>
              <input
                type="number"
                id="monthlyCost"
                name="monthlyCost"
                value={inputs.monthlyCost}
                onChange={handleInputChange}
                min="0"
                className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-cyan-400">Pipeline Value</label>
              <div className="w-full bg-gray-800 border border-cyan-500/50 rounded-md px-3 py-2 text-cyan-300">
                {formatCurrency(pipelineValue)}
              </div>
            </div>
          </div>

          {/* ROI Breakdown Table */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              ROI Breakdown
            </h3>
            <div className="border border-cyan-500/30 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cyan-500/10">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-cyan-400">Time Period</th>
                    <th className="px-4 py-3 text-right font-medium text-cyan-400">Revenue</th>
                    <th className="px-4 py-3 text-right font-medium text-cyan-400">Costs</th>
                    <th className="px-4 py-3 text-right font-medium text-cyan-400">Net Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-500/20">
                  <tr className="hover:bg-cyan-500/5">
                    <td className="px-4 py-3 font-medium text-cyan-300">First Month</td>
                    <td className="px-4 py-3 text-right text-cyan-300">{formatCurrency(monthlyRevenue)}</td>
                    <td className="px-4 py-3 text-right text-red-400">
                      {formatCurrency(inputs.monthlyCost + inputs.setupCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-purple-400">
                      {formatCurrency(firstMonthProfit)}
                    </td>
                  </tr>
                  <tr className="hover:bg-cyan-500/5">
                    <td className="px-4 py-3 font-medium text-cyan-300">First Quarter</td>
                    <td className="px-4 py-3 text-right text-cyan-300">{formatCurrency(quarterlyRevenue)}</td>
                    <td className="px-4 py-3 text-right text-red-400">
                      {formatCurrency((inputs.monthlyCost * 3) + inputs.setupCost)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-purple-400">
                      {formatCurrency(firstQuarterProfit)}
                    </td>
                  </tr>
                  <tr className="bg-purple-500/10">
                    <td className="px-4 py-3 font-bold text-purple-300">First Year Total</td>
                    <td className="px-4 py-3 text-right text-purple-300">{formatCurrency(yearlyRevenue)}</td>
                    <td className="px-4 py-3 text-right text-red-400">
                      {formatCurrency(inputs.setupCost + (inputs.monthlyCost * 12))}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-purple-300">
                      {formatCurrency(yearlyProfit)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakeven Analysis */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6 rounded-lg border border-cyan-500/30">
            <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              Breakeven Analysis
            </h3>
            <div className="text-lg">
              {isBreakevenPossible ? (
                <>
                  <span className="font-medium text-cyan-400">Breakeven Point: </span>
                  <span className="font-bold text-purple-400">
                    {monthsToBreakeven} months
                    {monthsToBreakeven <= 12 ? 
                      ` (Month ${monthsToBreakeven} from start)` : 
                      ' (After first year)'}
                  </span>
                </>
              ) : (
                <span className="text-red-400 font-medium">
                  Monthly revenue needs to exceed {formatCurrency(inputs.monthlyCost)} to achieve breakeven
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;