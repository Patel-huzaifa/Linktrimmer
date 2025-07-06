"use client";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState([]);

  // Get the base URL for the application
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUrls = localStorage.getItem("shortenedUrls");
    if (savedUrls) {
      try {
        setUrls(JSON.parse(savedUrls));
      } catch (error) {
        console.error("Error parsing saved URLs:", error);
      }
    }
  }, []);

  // Save URLs to localStorage whenever urls state changes
  useEffect(() => {
    localStorage.setItem("shortenedUrls", JSON.stringify(urls));
  }, [urls]);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateShortUrl = (shortUrl) => {
    // Check if short URL is empty
    if (!shortUrl.trim()) return false;

    // Check if it contains spaces
    if (shortUrl.includes(" ")) return false;

    // Check if it contains dots (to avoid conflicts with domain)
    if (shortUrl.includes(".")) return false;

    // Check if it's a reserved path
    const reservedPaths = [
      "about",
      "shorten",
      "api",
      "admin",
      "login",
      "register",
    ];
    if (reservedPaths.includes(shortUrl.toLowerCase())) return false;

    // Check length (between 1 and 50 characters)
    if (shortUrl.length < 1 || shortUrl.length > 50) return false;

    // Check if it contains only alphanumeric characters and hyphens
    if (!/^[a-zA-Z0-9-]+$/.test(shortUrl)) return false;

    // Check if this short URL already exists in our list
    if (urls.some((item) => item.shortUrl === shortUrl.trim())) {
      return false;
    }

    return true;
  };

  const handleGenerate = async () => {
    // Clear previous errors
    toast.dismiss();

    // Validate inputs
    if (!url.trim() || !shortUrl.trim()) {
      toast.error("Please enter both URL and short URL");
      return;
    }

    if (!validateUrl(url)) {
      toast.error(
        "Please enter a valid URL (must include http:// or https://)"
      );
      return;
    }

    if (!validateShortUrl(shortUrl)) {
      if (urls.some((item) => item.shortUrl === shortUrl.trim())) {
        toast.error(
          "This short URL already exists. Please choose a different one."
        );
      } else {
        toast.error(
          "Short URL must be 1-50 characters, alphanumeric only, no spaces or dots"
        );
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
          shorturl: shortUrl.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        const newUrl = {
          id: Date.now(),
          originalUrl: url.trim(),
          shortUrl: shortUrl.trim(),
          generatedUrl: `${getBaseUrl()}/${shortUrl.trim()}`,
          createdAt: new Date().toISOString(),
        };

        setUrls((prevUrls) => [newUrl, ...prevUrls]);

        // Clear form
        setUrl("");
        setShortUrl("");

        toast.success("URL shortened successfully! 🎉");
      } else {
        toast.error(result.message || "Failed to generate short URL");
      }
    } catch (error) {
      console.error("Error generating URL:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUrl("");
    setShortUrl("");
  };

  const handleDeleteUrl = (id) => {
    setUrls((prevUrls) => prevUrls.filter((url) => url.id !== id));
    toast.success("URL deleted successfully");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard! 📋");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const clearAllUrls = () => {
    setUrls([]);
    toast.success("All URLs cleared successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Shorten Your URLs
            </h1>
            <p className="text-lg text-gray-600">
              Transform long URLs into short, memorable links in seconds
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* URL Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Original URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-700"
                  disabled={isLoading}
                />
              </div>

              {/* Short URL Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Custom Short URL
                </label>
                <input
                  type="text"
                  value={shortUrl}
                  onChange={(e) => setShortUrl(e.target.value)}
                  placeholder="my-short-link"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors duration-200 text-gray-700"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use only letters, numbers, and hyphens (1-50 characters)
                </p>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer focus:outline-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  "Generate Short URL"
                )}
              </button>
            </div>
          </div>

          {/* URLs List Section */}
          {urls.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Shortened URLs ({urls.length})
                </h2>
                <button
                  onClick={clearAllUrls}
                  className="text-red-600 hover:text-red-700 font-medium cursor-pointer focus:outline-none"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {urls.map((urlItem) => (
                  <div
                    key={urlItem.id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Short URL */}
                        <div className="mb-3">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Short URL
                          </label>
                          <div className="flex items-center gap-2">
                            <Link href={urlItem.generatedUrl} target="_blank">
                              <code className="flex-1 text-lg font-mono text-purple-600 break-all cursor-pointer">
                                {urlItem.generatedUrl}
                              </code>
                            </Link>
                            <button
                              onClick={() =>
                                copyToClipboard(urlItem.generatedUrl)
                              }
                              className="flex-shrink-0 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 cursor-pointer focus:outline-none"
                              title="Copy to clipboard"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Original URL */}
                        <div className="mb-4">
                          <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Original URL
                          </label>
                          <p className="text-sm text-gray-600 break-all">
                            {urlItem.originalUrl}
                          </p>
                        </div>

                        {/* Created Date */}
                        <div className="text-xs text-gray-500">
                          Created:{" "}
                          {new Date(urlItem.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2">
                        <Link
                          href={urlItem.generatedUrl}
                          target="_blank"
                          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center cursor-pointer text-sm focus:outline-none"
                        >
                          Test
                        </Link>
                        <button
                          onClick={() => handleDeleteUrl(urlItem.id)}
                          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer text-sm focus:outline-none"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {urls.length === 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No URLs Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start by creating your first shortened URL above
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shorten;
