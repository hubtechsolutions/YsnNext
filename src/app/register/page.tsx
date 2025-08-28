"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Trophy, Search, ArrowLeft, CheckCircle } from "lucide-react";
import { BASE_URL } from "@/lib/api";

type SignupRole = "player" | "coach" | "scout";

interface PlayerData {
  user_fname: string;
  user_lname: string;
  user_dob: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface CoachData {
  user_fname: string;
  user_lname: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_mobile: string;
  user_college_name: string;
}

export default function RegisterPage() {
  const [role, setRole] = useState<SignupRole | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [scoutFile, setScoutFile] = useState<File | null>(null);

  const [playerData, setPlayerData] = useState<PlayerData>({
    user_fname: "",
    user_lname: "",
    user_dob: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [coachData, setCoachData] = useState<CoachData>({
    user_fname: "",
    user_lname: "",
    email: "",
    password: "",
    password_confirmation: "",
    user_mobile: "",
    user_college_name: "",
  });

  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerData({ ...playerData, [e.target.name]: e.target.value });
  };

  const handleCoachChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoachData({ ...coachData, [e.target.name]: e.target.value });
  };

  const resetStatus = () => {
    setError("");
    setSuccess("");
  };

  const submit = async () => {
    if (!role) return;
    resetStatus();
    setSubmitting(true);
    try {
      let formData: FormData | null = null;
      let payload: Record<string, string | number | boolean> = {};
      let signupType: number;

      if (role === "player") {
        signupType = 0;
        payload = {
          signupType,
          user_fname: playerData.user_fname,
          "user-lname": playerData.user_lname,
          user_dob: playerData.user_dob,
          email: playerData.email,
          password: playerData.password,
          password_confirmation: playerData.password_confirmation,
        };
      } else if (role === "coach") {
        signupType = 1;
        payload = {
          signupType,
          user_fname: coachData.user_fname,
          "user-lname": coachData.user_lname,
          email: coachData.email,
          password: coachData.password,
          password_confirmation: coachData.password_confirmation,
          user_mobile: coachData.user_mobile,
          user_college_name: coachData.user_college_name,
        };
      } else {
        signupType = 1;
        formData = new FormData();
        formData.append("signupType", String(signupType));
        formData.append("user_fname", coachData.user_fname);
        formData.append("user-lname", coachData.user_lname);
        formData.append("email", coachData.email);
        formData.append("password", coachData.password);
        formData.append("password_confirmation", coachData.password_confirmation);
        formData.append("user_mobile", coachData.user_mobile);
        formData.append("user_college_name", coachData.user_college_name);
        formData.append("is_professional_scout", "true");
        if (scoutFile) formData.append("file", scoutFile);
      }

      const endpoint = `${BASE_URL}/register`;
      let res: Response;
      if (formData) {
        res = await fetch(endpoint, { method: "POST", body: formData });
      } else {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status === false) {
        throw new Error(data.message || "Registration failed");
      }
      setSuccess("Account created successfully! You may now log in.");
      setPlayerData({
        user_fname: "",
        user_lname: "",
        user_dob: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setCoachData({
        user_fname: "",
        user_lname: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_mobile: "",
        user_college_name: "",
      });
      setScoutFile(null);
      setRole(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const roleCards = [
    {
      role: "player" as SignupRole,
      title: "Player",
      subtitle: "Build Your Athletic Profile",
      description: "Track your stats, showcase your skills, and connect with coaches and scouts.",
      icon: User,
      features: ["Performance Analytics", "Recruitment Profile", "Event Tracking"],
      gradient: "from-purple-600 to-violet-600",
    },
    {
      role: "coach" as SignupRole,
      title: "Coach",
      subtitle: "Manage & Develop Talent",
      description: "Organize your team, track player progress, and discover new talent.",
      icon: Trophy,
      features: ["Team Management", "Player Analytics", "Recruitment Tools"],
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      role: "scout" as SignupRole,
      title: "Professional Scout",
      subtitle: "Advanced Scouting Access",
      description: "Get premium access to player data, advanced analytics, and recruitment tools.",
      icon: Search,
      features: ["Advanced Analytics", "Premium Access", "Detailed Reports"],
      gradient: "from-violet-600 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
            Join Our Platform
          </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose your role and start your journey in sports excellence
            </p>
        </div>

        {!role && (
          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {roleCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Card
                  key={card.role}
                  className="group relative overflow-hidden bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  onClick={() => setRole(card.role)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                          {card.title}
                        </CardTitle>
                        <CardDescription className="text-purple-300 font-medium">
                          {card.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-gray-300 mb-6 leading-relaxed">{card.description}</p>
                    <div className="space-y-2">
                      {card.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-purple-400" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full mt-6 bg-gradient-to-r ${card.gradient} hover:opacity-90 text-white border-0 shadow-lg`}
                      onClick={(e) => { e.stopPropagation(); setRole(card.role); }}
                    >
                      Get Started as {card.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {role && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setRole(null)}
                  disabled={submitting}
                  className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {role === "scout" ? "Professional Scout Registration" : role === "coach" ? "Coach Registration" : "Player Registration"}
                  </h2>
                  <p className="text-purple-300 mt-1">Complete your profile to get started</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="user_fname" className="text-gray-300 font-medium">First Name</Label>
                  <Input
                    id="user_fname"
                    name="user_fname"
                    value={(role === "player" ? playerData : coachData).user_fname}
                    onChange={role === "player" ? handlePlayerChange : handleCoachChange}
                    placeholder="Enter your first name"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_lname" className="text-gray-300 font-medium">Last Name</Label>
                  <Input
                    id="user_lname"
                    name="user_lname"
                    value={(role === "player" ? playerData : coachData).user_lname}
                    onChange={role === "player" ? handlePlayerChange : handleCoachChange}
                    placeholder="Enter your last name"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                {role === "player" && (
                  <div className="space-y-2">
                    <Label htmlFor="user_dob" className="text-gray-300 font-medium">Date of Birth</Label>
                    <Input
                      id="user_dob"
                      type="date"
                      name="user_dob"
                      value={playerData.user_dob}
                      onChange={handlePlayerChange}
                      className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500/20"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={(role === "player" ? playerData : coachData).email}
                    onChange={role === "player" ? handlePlayerChange : handleCoachChange}
                    placeholder="you@example.com"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={(role === "player" ? playerData : coachData).password}
                    onChange={role === "player" ? handlePlayerChange : handleCoachChange}
                    placeholder="Create a strong password"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation" className="text-gray-300 font-medium">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={(role === "player" ? playerData : coachData).password_confirmation}
                    onChange={role === "player" ? handlePlayerChange : handleCoachChange}
                    placeholder="Confirm your password"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                  />
                </div>
                {(role === "coach" || role === "scout") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="user_mobile" className="text-gray-300 font-medium">Mobile Number</Label>
                      <Input
                        id="user_mobile"
                        name="user_mobile"
                        value={coachData.user_mobile}
                        onChange={handleCoachChange}
                        placeholder="Enter your phone number"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="user_college_name" className="text-gray-300 font-medium">College/Organization</Label>
                      <Input
                        id="user_college_name"
                        name="user_college_name"
                        value={coachData.user_college_name}
                        onChange={handleCoachChange}
                        placeholder="Enter your college or organization"
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
                      />
                    </div>
                  </>
                )}
                {role === "scout" && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="scout_file" className="text-gray-300 font-medium">Supporting Documentation</Label>
                    <Input
                      id="scout_file"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={(e) => setScoutFile(e.target.files?.[0] || null)}
                      className="bg-gray-800 border-gray-700 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-purple-700"
                    />
                    <p className="text-xs text-gray-500">Upload Role_per.xlsx or relevant professional documentation (Excel format only)</p>
                  </div>
                )}
              </div>

              {error && (
                <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}
              {success && (
                <div className="mt-6 p-4 bg-green-900/50 border border-green-700 rounded-lg">
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
              )}

              <Button
                className="w-full mt-8 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
