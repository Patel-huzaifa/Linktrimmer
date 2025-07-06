"use client";
import React from "react";
import Link from "next/link";


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">LinkTrimer</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We believe in simplicity, privacy, and efficiency. LinkTrimer is
            more than just a URL shortener - it&apos;s your trusted companion for
            creating clean, memorable links without compromising your privacy.
          </p>E
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                In a world where every click is tracked and every action is
                monitored, we stand for something different. LinkTrimer was
                born from a simple belief: URL shortening should be
                straightforward, secure, and respectful of your privacy.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We&apos;ve eliminated the unnecessary complexity that plagues other
                URL shorteners. No accounts to create, no personal data to
                share, no tracking to worry about. Just pure, simple link
                shortening that works exactly when you need it.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base text-gray-700 font-medium">
                    No Registration Required
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base text-gray-700 font-medium">
                    Zero Tracking
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base text-gray-700 font-medium">
                    Instant Results
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="text-base text-gray-700 font-medium">
                    Custom Short URLs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Privacy First
              </h3>
              <p className="text-gray-600">
                Your data stays yours. We don&apos;t collect, store, or analyze
                your personal information. Every link you create is private by
                default.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Get your shortened URL instantly. No waiting, no processing
                delays. Our streamlined system delivers results in
                milliseconds.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Simple & Clean
              </h3>
              <p className="text-gray-600">
                No overwhelming interfaces or confusing options. Just a clean,
                intuitive design that gets the job done without fuss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
            <p>
              LinkTrimer began as a simple frustration with existing URL
              shorteners. Every tool we tried either required an account,
              collected personal data, or bombarded users with unnecessary
              features. We knew there had to be a better way.
            </p>

            <p>
              So we built one. LinkTrimer was created with a single purpose:
              to provide the fastest, most private URL shortening experience
              possible. No bells, no whistles, no hidden agendas - just clean,
              efficient link shortening.
            </p>

            <p>
              Today, we&apos;re proud to serve users who value simplicity and
              privacy. Whether you&apos;re sharing links on social media, creating
              memorable URLs for presentations, or just need to clean up a
              long web address, LinkTrimer is here to help - no strings
              attached.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust LinkTrimer for their URL shortening needs.
            Start creating clean, memorable links today.
          </p>
          <Link href="/shorten">
            <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer focus:outline-none">
              Start Shortening Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
