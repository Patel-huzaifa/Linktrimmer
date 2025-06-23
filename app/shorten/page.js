"use client";
import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const Shorten = () => {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");
  const [generated, setgenerated] = useState("");
  const [ogurl, setogurl] = useState("");
  const [ogshorturl, setogshorturl] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedGenerated = localStorage.getItem("generatedUrl");
    const savedUrl = localStorage.getItem("savedUrl");
    const savedShortUrl = localStorage.getItem("savedShortUrl");
    const savedOgUrl = localStorage.getItem("savedOgUrl");
    const savedOgShortUrl = localStorage.getItem("savedOgShortUrl");
    if (savedGenerated) {
      setgenerated(savedGenerated);
    }
    if (savedUrl) {
      seturl(savedUrl);
    }
    if (savedShortUrl) {
      setshorturl(savedShortUrl);
    }
    if (savedOgUrl) {
      setogurl(savedOgUrl);
    }
    if (savedOgShortUrl) {
      setogshorturl(`${process.env.NEXT_PUBLIC_URL}/${savedOgShortUrl}`);
    }
  }, []);

  const handleGenerate = async () => {
    if (url === "" || shorturl === "") {
      toast.error("Please enter a valid URL and short URL");
      return;
    }
    if (!url.includes("http") || !url.includes("https")) {
      toast.error("Please enter a valid URL");
      return;
    }
    if (shorturl.includes("about") || shorturl.includes("shorten")) {
      toast.error("Please enter a valid short URL");
      return;
    }
    if (shorturl.includes(" ")) {
      toast.error("Please enter a valid short URL");
      return;
    }
    if (shorturl.length < 1) {
      toast.error("Please enter a valid short URL");
      return;
    }

    if (shorturl.includes(".")) {
      toast.error("Please enter a valid short URL");
      return;
    }
    if (shorturl.includes(" ")) {
      toast.error("Please enter a valid short URL");
      return;
    }
    if (shorturl.includes(".")) {
      toast.error("Please enter a valid short URL");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shorturl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        const generatedUrl = `${process.env.NEXT_PUBLIC_URL}/${shorturl}`;
        setgenerated(generatedUrl);

        // Save to localStorage
        localStorage.setItem("generatedUrl", generatedUrl);
        localStorage.setItem("savedUrl", url);
        localStorage.setItem("savedShortUrl", shorturl);
        localStorage.setItem("savedOgUrl", url);
        localStorage.setItem("savedOgShortUrl", shorturl);

        seturl("");
        setshorturl("");
        toast(result.message);
      })
      .catch((error) => {
        console.error(error);
        setgenerated("");
        seturl("");
        setshorturl("");
        // Clear localStorage on error
        localStorage.removeItem("generatedUrl");
        localStorage.removeItem("savedUrl");
        localStorage.removeItem("savedShortUrl");
        localStorage.removeItem("savedOgUrl");
        localStorage.removeItem("savedOgShortUrl");
      });
  };

  const handleClear = () => {
    setgenerated("");
    seturl("");
    setshorturl("");
    // Clear localStorage
    localStorage.removeItem("generatedUrl");
    localStorage.removeItem("savedUrl");
    localStorage.removeItem("savedShortUrl");
    localStorage.removeItem("savedOgUrl");
    localStorage.removeItem("savedOgShortUrl");
    toast.success("Data cleared");
  };

  return (
    <>
      <div className="mx-auto  max-w-xl bg-[#cffcc9] my-16 p-8 rounded-lg flex flex-col gap-4">
        <h2 className="text-center text-2xl font-bold">
          Generate your short URL
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name=""
            value={url}
            className="p-4 rounded-lg bg-white focus:outline-green-400"
            placeholder="Enter your URL"
            id=""
            onChange={(e) => seturl(e.target.value)}
          />
          <input
            type="text"
            name=""
            value={shorturl}
            className="p-4 rounded-lg bg-white focus:outline-green-400"
            placeholder="Enter your preferred short URL text"
            id=""
            onChange={(e) => setshorturl(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Generate
          </button>
        </div>
        {ogurl && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-500">Your short URL is:</p>
            <Link
              target="_blank"
              href={ogshorturl}
              className="font-bold text-blue-500 hover:text-blue-700 transition-colors"
            >
              <code className="cursor-pointer break-all">
                {ogshorturl}
              </code>
            </Link>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Original URL:</p>
              <p className="text-sm text-gray-700 break-all word-break-all leading-relaxed">
                {ogurl}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ogshorturl);
                  toast.success("Copied to clipboard");
                }}
                className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex-1"
              >
                Copy
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shorten;
