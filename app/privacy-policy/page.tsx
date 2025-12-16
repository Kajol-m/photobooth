"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Footer from "@/common/Footer/Footer";

const PrivacyPolicy = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#F5F5DA] flex flex-col items-center p-6 md:p-12">
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#C9212D] font-bold tracking-widest text-sm hover:-translate-x-1 transition-transform"
        >
          <ArrowLeft size={20} /> BACK
        </button>

        <div className="bg-[#C9212D] text-white px-8 py-3 text-lg font-bold tracking-[0.2em] shadow-sm uppercase flex items-center gap-3">
          <ShieldCheck size={20} /> PRIVACY POLICY
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-4xl border-2 border-[#C9212D] bg-[#F5F5DA] p-8 md:p-12 space-y-8 text-[#C9212D]">
        <section>
          <h2 className="text-2xl font-bold tracking-wide mb-4 uppercase border-b-2 border-[#C9212D]/20 pb-2">
            1. Introduction
          </h2>
          <p className="leading-relaxed opacity-80">
            Welcome to our Photobooth App. We respect your privacy and are
            committed to protecting your personal data. This policy explains how
            we handle your photos and information when you use our application.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-wide mb-4 uppercase border-b-2 border-[#C9212D]/20 pb-2">
            2. Data Collection
          </h2>
          <p className="leading-relaxed opacity-80 mb-4">
            We collect data primarily to provide the photobooth functionality.
            This includes:
          </p>
          <ul className="list-disc pl-5 space-y-2 opacity-80 marker:text-[#C9212D]">
            <li>
              <strong>Images:</strong> Photos you upload or capture using the
              camera.
            </li>
            <li>
              <strong>Usage Data:</strong> Information on how you interact with
              the app (e.g., layouts selected).
            </li>
            <li>
              <strong>Device Info:</strong> Basic browser and device information
              for compatibility.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-wide mb-4 uppercase border-b-2 border-[#C9212D]/20 pb-2">
            3. How We Use Your Photos
          </h2>
          <p className="leading-relaxed opacity-80">
            Your photos are processed <strong>locally on your device</strong>{" "}
            whenever possible. If uploaded to our servers for processing (e.g.,
            generating a strip), they are temporarily stored and strictly used
            for generating your downloadable content. We do not sell or share
            your personal photos with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-wide mb-4 uppercase border-b-2 border-[#C9212D]/20 pb-2">
            4. Contact Us
          </h2>
          <p className="leading-relaxed opacity-80">
            If you have any questions about this Privacy Policy, please contact
            us via our social media channels:
          </p>
          <div className="mt-4 flex gap-4 font-bold tracking-wider">
            <a
              href="https://instagram.com/jimmie_codes"
              className="hover:underline"
            >
              @JIMMIE_CODES
            </a>
            <span>/</span>
            <a href="https://github.com/kajol-m" className="hover:underline">
              GITHUB: KAJOL-M
            </a>
          </div>
        </section>

        <div className="pt-8 mt-8 border-t-2 border-[#C9212D]/20 text-center opacity-60 text-xs tracking-widest">
          LAST UPDATED: {new Date().toLocaleDateString()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
