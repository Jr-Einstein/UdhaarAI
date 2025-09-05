"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"language" | "tutorial" | "manual" | "application" | "dashboard">(
    "language",
  )
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [loanData, setLoanData] = useState({
    hasLoan: false,
    loanAmount: 25000,
    remainingBalance: 18750,
    nextPaymentDate: "15 जनवरी 2025 • 15 January 2025",
    monthlyEMI: 2250,
    totalPaid: 6750,
    paymentsCompleted: 3,
    totalPayments: 12,
    creditScore: 720,
    communityRating: 4.5,
  })

  useEffect(() => {
    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleLoanDisbursed = (amount: number) => {
    setLoanData((prev) => ({
      ...prev,
      hasLoan: true,
      loanAmount: amount,
      remainingBalance: amount * 0.75, // Simulate some payments made
    }))
    setCurrentScreen("dashboard")
  }

  if (showSplash) {
    return <SplashScreen />
  }

  if (currentScreen === "language") {
    return (
      <LanguageSelection
        selectedLanguage={selectedLanguage}
        onLanguageSelect={setSelectedLanguage}
        onContinue={() => setCurrentScreen("tutorial")}
        onManualRequest={() => setCurrentScreen("manual")}
      />
    )
  }

  if (currentScreen === "manual") {
    return <ManualScreen onClose={() => setCurrentScreen("tutorial")} />
  }

  if (currentScreen === "tutorial") {
    return <TutorialScreen onComplete={() => setCurrentScreen("application")} />
  }

  if (currentScreen === "application") {
    return <LoanApplicationJourney onLoanDisbursed={handleLoanDisbursed} />
  }

  return <LoanDashboard loanData={loanData} onNewApplication={() => setCurrentScreen("application")} />
}

function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex items-center justify-center p-4">
      <div className="text-center space-y-8 animate-fade-in">
        {/* Logo and App Name */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-primary">UdhaarAI</h1>
          <p className="text-xl text-muted-foreground font-medium">आपका विश्वसनीय साथी</p>
          <p className="text-lg text-foreground">Your Trusted Financial Companion</p>
        </div>

        {/* Cultural Elements */}
        <div className="flex justify-center space-x-4 opacity-60">
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>

        {/* Loading Message */}
        <p className="text-muted-foreground text-lg">सरल • भरोसेमंद • सुरक्षित</p>
      </div>
    </div>
  )
}

function LanguageSelection({
  selectedLanguage,
  onLanguageSelect,
  onContinue,
  onManualRequest,
}: {
  selectedLanguage: string | null
  onLanguageSelect: (code: string) => void
  onContinue: () => void
  onManualRequest: () => void
}) {
  const [showQuickGuide, setShowQuickGuide] = useState(true)

  const languages = [
    { code: "hi", name: "हिंदी", flag: "🇮🇳", english: "Hindi" },
    { code: "en", name: "English", flag: "🇬🇧", english: "English" },
    { code: "bn", name: "বাংলা", flag: "🇧🇩", english: "Bengali" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳", english: "Telugu" },
    { code: "mr", name: "मराठी", flag: "🇮🇳", english: "Marathi" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳", english: "Tamil" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuickGuide(false)
      if (selectedLanguage) {
        onContinue()
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [selectedLanguage, onContinue])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">अपनी भाषा चुनें</h2>
          <p className="text-lg text-muted-foreground">Choose Your Language</p>
        </div>

        {showQuickGuide && (
          <div className="text-center">
            <Button variant="outline" onClick={onManualRequest} className="text-sm px-6 py-2 bg-transparent">
              📖 क्या आप गाइड चाहते हैं? • Do you want a quick guide?
            </Button>
          </div>
        )}

        {/* Language Options */}
        <div className="space-y-3">
          {languages.map((language) => (
            <Card
              key={language.code}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-2 ${
                selectedLanguage === language.code
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onLanguageSelect(language.code)}
            >
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{language.flag}</span>
                <div className="flex-1">
                  <p className="text-xl font-semibold text-foreground">{language.name}</p>
                  <p className="text-sm text-muted-foreground">{language.english}</p>
                </div>
                {selectedLanguage === language.code && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedLanguage && (
          <Button className="w-full py-6 text-lg font-semibold animate-fade-in" onClick={onContinue}>
            आगे बढ़ें • Continue
          </Button>
        )}

        {/* Help Text */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Need help? Tap the microphone icon to speak</p>
          <Button variant="ghost" size="sm" className="mt-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            मदद के लिए बोलें • Speak for Help
          </Button>
        </div>
      </div>
    </div>
  )
}

function ManualScreen({ onClose }: { onClose: () => void }) {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      title: "UdhaarAI के बारे में • About UdhaarAI",
      content: [
        "UdhaarAI एक आवाज-आधारित ऋण ऐप है जो ग्रामीण भारत के लिए बनाया गया है।",
        "UdhaarAI is a voice-first lending app designed for rural India.",
        "",
        "मुख्य विशेषताएं • Key Features:",
        "• आवाज से आवेदन करें • Apply using voice",
        "• सरल भाषा में समझाया गया • Explained in simple language",
        "• तुरंत अप्रूवल • Instant approval",
        "• सुरक्षित और भरोसेमंद • Safe and trusted",
      ],
    },
    {
      title: "ऋण के लिए आवेदन कैसे करें • How to Apply for Loan",
      content: [
        "1. अपनी भाषा चुनें • Choose your language",
        "2. उधार साथी से बात करें • Talk to Udhaar Saathi",
        "3. अपनी जानकारी बताएं • Share your information",
        "4. आय और ऋण का कारण बताएं • Tell income and loan purpose",
        "5. SMS की अनुमति दें • Allow SMS access",
        "6. बैंक की जानकारी दें • Provide bank details",
        "7. ऋण मिल जाएगा • Loan will be disbursed",
      ],
    },
    {
      title: "वापसी कैसे करें • How to Repay",
      content: [
        "आसान तरीके • Easy Methods:",
        "",
        "1. QR कोड स्कैन करें • Scan QR code",
        "2. स्थानीय एजेंट को पैसे दें • Pay local agent",
        "3. ऑनलाइन भुगतान • Online payment",
        "",
        "अगली किस्त की तारीख ऐप में दिखेगी।",
        "Next payment date will show in app.",
      ],
    },
    {
      title: "सुरक्षा और गोपनीयता • Security & Privacy",
      content: [
        "आपकी जानकारी पूरी तरह सुरक्षित है।",
        "Your information is completely secure.",
        "",
        "• कोई PIN या पासवर्ड नहीं मांगते • No PIN or password asked",
        "• डेटा एन्क्रिप्टेड है • Data is encrypted",
        "• आधार सुरक्षित वॉल्ट में • Aadhaar in secure vault",
        "• आपकी अनुमति के बिना कुछ नहीं • Nothing without your permission",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold">UdhaarAI गाइड • Guide</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="bg-muted p-4">
        <div className="max-w-md mx-auto">
          <h2 className="font-semibold mb-3 text-foreground">विषय सूची • Contents</h2>
          <div className="grid grid-cols-1 gap-2">
            {sections.map((section, index) => (
              <Button
                key={index}
                variant={currentSection === index ? "default" : "ghost"}
                className="justify-start text-left h-auto p-3"
                onClick={() => setCurrentSection(index)}
              >
                <span className="text-sm">
                  {index + 1}. {section.title}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">{sections[currentSection].title}</h3>
            <div className="space-y-2">
              {sections[currentSection].content.map((line, index) => (
                <p
                  key={index}
                  className={`${line === "" ? "h-2" : ""} ${line.startsWith("•") ? "ml-4" : ""} text-foreground leading-relaxed`}
                >
                  {line}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-muted p-4">
        <div className="max-w-md mx-auto flex justify-between">
          <Button
            variant="outline"
            disabled={currentSection === 0}
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          >
            ← पिछला • Previous
          </Button>
          <Button
            variant="outline"
            disabled={currentSection === sections.length - 1}
            onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          >
            अगला • Next →
          </Button>
        </div>
      </div>

      {/* Go to App Button */}
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <Button className="w-full py-4 text-lg font-semibold" onClick={onClose}>
            ऐप पर जाएं • Go to App
          </Button>
        </div>
      </div>
    </div>
  )
}

function TutorialScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0)
  const [isListening, setIsListening] = useState(false)
  const [userInput, setUserInput] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    {
      message: "नमस्ते! मैं उधार साथी हूं। मैं आपकी मदद करूंगा।",
      englishMessage: "Hello! I am Udhaar Saathi. I will help you.",
      instruction: "माइक्रोफोन पर टैप करके अपना नाम बताएं।",
      englishInstruction: "Tap the microphone and tell me your name.",
      expectedInput: "name",
    },
    {
      message: "बहुत अच्छा! अब मुझे अपना गांव या शहर का नाम बताएं।",
      englishMessage: "Very good! Now tell me your village or city name.",
      instruction: "माइक्रोफोन दबाकर बोलें।",
      englishInstruction: "Press microphone and speak.",
      expectedInput: "location",
    },
    {
      message: "परफेक्ट! देखा कितना आसान है?",
      englishMessage: "Perfect! See how easy it is?",
      instruction: "अब हम आपका असली आवेदन शुरू कर सकते हैं।",
      englishInstruction: "Now we can start your real application.",
      expectedInput: "complete",
    },
  ]

  const handleMicClick = () => {
    setIsListening(true)
    // Simulate voice input processing
    setTimeout(() => {
      setIsListening(false)
      setUserInput("Sample input received")
      setShowSuccess(true)

      setTimeout(() => {
        setShowSuccess(false)
        if (step < steps.length - 1) {
          setStep(step + 1)
          setUserInput("")
        }
      }, 2000)
    }, 2000)
  }

  const currentStep = steps[step]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Udhaar Saathi Character */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg">
            <svg className="w-12 h-12 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">उधार साथी • Udhaar Saathi</h2>
        </div>

        {/* Message Card */}
        <Card className="p-6 bg-card border-2 border-primary/20">
          <div className="space-y-4">
            <p className="text-lg font-medium text-foreground text-center">{currentStep.message}</p>
            <p className="text-base text-muted-foreground text-center">{currentStep.englishMessage}</p>

            <div className="border-t pt-4">
              <p className="text-base text-foreground text-center font-medium">{currentStep.instruction}</p>
              <p className="text-sm text-muted-foreground text-center">{currentStep.englishInstruction}</p>
            </div>
          </div>
        </Card>

        {/* Microphone Button */}
        <div className="text-center">
          <Button
            size="lg"
            className={`w-20 h-20 rounded-full p-0 transition-all duration-300 ${
              isListening ? "bg-secondary hover:bg-secondary/90 animate-pulse" : "bg-primary hover:bg-primary/90"
            }`}
            onClick={handleMicClick}
            disabled={isListening || showSuccess}
          >
            {isListening ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : showSuccess ? (
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            )}
          </Button>

          {isListening && (
            <div className="mt-4">
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">सुन रहा हूं... • Listening...</p>
            </div>
          )}

          {showSuccess && <p className="text-sm text-secondary font-medium mt-4">✓ बहुत अच्छा! • Very good!</p>}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index <= step ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Complete Button */}
        {step === steps.length - 1 && showSuccess && (
          <Button className="w-full py-4 text-lg font-semibold animate-fade-in" onClick={onComplete}>
            आवेदन शुरू करें • Start Application
          </Button>
        )}

        {/* Skip Tutorial */}
        <div className="text-center">
          <Button variant="ghost" onClick={onComplete} className="text-sm">
            ट्यूटोरियल छोड़ें • Skip Tutorial
          </Button>
        </div>
      </div>
    </div>
  )
}

function LoanApplicationJourney({ onLoanDisbursed }: { onLoanDisbursed: (amount: number) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [applicationData, setApplicationData] = useState({
    name: "",
    location: "",
    income: "",
    loanAmount: "",
    purpose: "",
    bankAccount: "",
    aadhaar: "",
    phone: "",
  })
  const [isListening, setIsListening] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const steps = [
    {
      title: "व्यक्तिगत जानकारी • Personal Information",
      question: "आपका पूरा नाम क्या है?",
      englishQuestion: "What is your full name?",
      field: "name",
      placeholder: "राम कुमार • Ram Kumar",
    },
    {
      title: "स्थान • Location",
      question: "आप कहां रहते हैं? गांव और जिला बताएं।",
      englishQuestion: "Where do you live? Tell village and district.",
      field: "location",
      placeholder: "रामपुर, मेरठ • Rampur, Meerut",
    },
    {
      title: "आय की जानकारी • Income Information",
      question: "आपकी महीने की कमाई कितनी है?",
      englishQuestion: "What is your monthly income?",
      field: "income",
      placeholder: "₹15,000",
    },
    {
      title: "ऋण की राशि • Loan Amount",
      question: "आपको कितने रुपए चाहिए?",
      englishQuestion: "How much money do you need?",
      field: "loanAmount",
      placeholder: "₹25,000",
    },
    {
      title: "ऋण का कारण • Loan Purpose",
      question: "पैसे किस काम के लिए चाहिए?",
      englishQuestion: "What do you need the money for?",
      field: "purpose",
      placeholder: "व्यापार • Business",
    },
    {
      title: "बैंक खाता • Bank Account",
      question: "आपका बैंक खाता नंबर क्या है?",
      englishQuestion: "What is your bank account number?",
      field: "bankAccount",
      placeholder: "1234567890",
    },
  ]

  const handleVoiceInput = () => {
    setIsListening(true)
    // Simulate voice processing
    setTimeout(() => {
      setIsListening(false)
      setShowSuccess(true)

      // Simulate filling the field
      const currentField = steps[currentStep].field
      const sampleData = {
        name: "राम कुमार",
        location: "रामपुर, मेरठ",
        income: "₹15,000",
        loanAmount: "₹25,000",
        purpose: "व्यापार",
        bankAccount: "1234567890",
      }

      setApplicationData((prev) => ({
        ...prev,
        [currentField]: sampleData[currentField as keyof typeof sampleData],
      }))

      setTimeout(() => {
        setShowSuccess(false)
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1)
        } else {
          // Complete application
          handleApplicationComplete()
        }
      }, 1500)
    }, 2000)
  }

  const handleApplicationComplete = () => {
    // Simulate loan approval and disbursement
    setTimeout(() => {
      onLoanDisbursed(25000)
    }, 3000)
  }

  const currentStepData = steps[currentStep]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold text-center">ऋण आवेदन • Loan Application</h1>
          <div className="flex justify-center mt-2">
            <span className="text-sm">
              {currentStep + 1} / {steps.length}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted p-4">
        <div className="max-w-md mx-auto">
          <div className="w-full bg-background rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-md mx-auto space-y-8">
          {/* Udhaar Saathi */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-primary">उधार साथी</h2>
          </div>

          {/* Question Card */}
          <Card className="p-6 border-2 border-primary/20">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">{currentStepData.title}</h3>
              <p className="text-lg font-medium text-foreground">{currentStepData.question}</p>
              <p className="text-base text-muted-foreground">{currentStepData.englishQuestion}</p>

              {/* Input Field */}
              <div className="mt-4">
                <input
                  type="text"
                  value={applicationData[currentStepData.field as keyof typeof applicationData]}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      [currentStepData.field]: e.target.value,
                    }))
                  }
                  placeholder={currentStepData.placeholder}
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground"
                />
              </div>
            </div>
          </Card>

          {/* Voice Input */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              className={`w-20 h-20 rounded-full p-0 transition-all duration-300 ${
                isListening ? "bg-secondary hover:bg-secondary/90 animate-pulse" : "bg-primary hover:bg-primary/90"
              }`}
              onClick={handleVoiceInput}
              disabled={isListening}
            >
              {isListening ? (
                <div className="w-6 h-6 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin"></div>
              ) : showSuccess ? (
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              )}
            </Button>

            <p className="text-sm text-muted-foreground">
              {isListening ? "सुन रहा हूं... • Listening..." : "बोलने के लिए दबाएं • Press to speak"}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            >
              ← पिछला • Back
            </Button>
            <Button
              disabled={!applicationData[currentStepData.field as keyof typeof applicationData] || isListening}
              onClick={() => {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(currentStep + 1)
                } else {
                  handleApplicationComplete()
                }
              }}
            >
              {currentStep === steps.length - 1 ? "जमा करें • Submit" : "अगला • Next"} →
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoanDashboard({
  loanData,
  onNewApplication,
}: {
  loanData: any
  onNewApplication: () => void
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "repay" | "community" | "rewards">("overview")
  const [showQRCode, setShowQRCode] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">UdhaarAI</h1>
            <p className="text-sm opacity-90">आपका डैशबोर्ड • Your Dashboard</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">क्रेडिट स्कोर • Credit Score</p>
            <p className="text-2xl font-bold">{loanData.creditScore}</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-muted p-1">
        <div className="max-w-md mx-auto flex rounded-lg overflow-hidden">
          {[
            { key: "overview", label: "होम • Home" },
            { key: "repay", label: "भुगतान • Pay" },
            { key: "community", label: "समुदाय • Community" },
            { key: "rewards", label: "रिवार्ड • Rewards" },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className="flex-1 text-xs py-2"
              onClick={() => setActiveTab(tab.key as any)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {activeTab === "overview" && (
            <>
              {/* Loan Status Card */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">वर्तमान ऋण • Current Loan</h2>
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                      सक्रिय • Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">कुल राशि • Total Amount</p>
                      <p className="text-xl font-bold text-foreground">₹{loanData.loanAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">बकाया • Remaining</p>
                      <p className="text-xl font-bold text-foreground">₹{loanData.remainingBalance.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">प्रगति • Progress</span>
                      <span className="text-foreground">
                        {loanData.paymentsCompleted}/{loanData.totalPayments} किस्तें पूरी की गईं
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">अगली किस्त की तारीख • Next Payment Date</span>
                      <span className="text-foreground">{loanData.nextPaymentDate}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Next Payment Card */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">अगली किस्त • Next Payment</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">तारीख • Date</p>
                      <p className="text-xl font-bold text-foreground">{loanData.nextPaymentDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">राशि • Amount</p>
                      <p className="text-xl font-bold text-foreground">₹{loanData.monthlyEMI.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Community Rating Card */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">समुदाय रेटिंग • Community Rating</h2>
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    <span className="text-xl font-bold text-primary ml-2">{loanData.communityRating}</span>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeTab === "repay" && (
            <div className="space-y-4">
              {/* QR Code */}
              {showQRCode && (
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center shadow-lg">
                    <svg
                      className="w-24 h-24 text-primary-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">QR कोड स्कैन करें • Scan QR code</p>
                </div>
              )}

              {/* Local Agent Payment */}
              <div className="text-center">
                <Button className="w-full py-4 text-lg font-semibold" onClick={() => setShowQRCode(false)}>
                  स्थानीय एजेंट को पैसे दें • Pay local agent
                </Button>
              </div>

              {/* Online Payment */}
              <div className="text-center">
                <Button className="w-full py-4 text-lg font-semibold" onClick={() => setShowQRCode(false)}>
                  ऑनलाइन भुगतान • Online payment
                </Button>
              </div>
            </div>
          )}

          {activeTab === "community" && (
            <div className="space-y-4">
              {/* Community Information */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">समुदाय के बारे में • About Community</h2>
                  <p className="text-base text-muted-foreground">समुदाय का रेटिंग आपकी ऋण अवसरों को बढ़ावा देता है।</p>
                  <p className="text-base text-muted-foreground">Community rating improves your loan opportunities.</p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "rewards" && (
            <div className="space-y-4">
              {/* Rewards Information */}
              <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">रिवार्ड • Rewards</h2>
                  <p className="text-base text-muted-foreground">अपने ऋण को अच्छे से भुगतान करके रिवार्ड अर्जित करें।</p>
                  <p className="text-base text-muted-foreground">Earn rewards by paying your loan on time.</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
