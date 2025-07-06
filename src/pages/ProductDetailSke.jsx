import React from 'react'

function ProductDetailSke() {
  return (
       <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Loading Image */}
              <div className="space-y-4">
                <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>

              {/* Loading Content */}
              <div className="space-y-6">
                <div>
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="w-full h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="flex space-x-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="w-20 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>

                  <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-2/3 h-3 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="w-40 h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProductDetailSke
