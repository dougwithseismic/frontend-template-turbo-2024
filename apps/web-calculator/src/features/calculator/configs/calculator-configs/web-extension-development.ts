import { NewCalculator } from "../../types";

const calculator: NewCalculator = {
  name: "AI-Powered Web Extension Development Calculator",
  slug: "web-extension-development",
  meta: {
    title: "AI-Powered Web Extension Feature and Complexity Calculator",
    description:
      "Determine the features, complexity, and approach for your AI-powered web extension project.",
  },
  questions: [
    {
      id: "extension-type",
      title: "What type of web extension are you developing?",
      shortTitle: "Extension Type",
      type: "radio",
      required: true,
      options: [
        { label: "Browser action", value: "browser_action" },
        { label: "Page action", value: "page_action" },
        { label: "Content script", value: "content_script" },
        { label: "Background script", value: "background_script" },
        { label: "Combination of multiple types", value: "combination" },
      ],
      validation: {
        schema: {
          enum: [
            "browser_action",
            "page_action",
            "content_script",
            "background_script",
            "combination",
          ],
        },
        errorMessage: "Please select an extension type",
      },
    },
    {
      id: "browser-compatibility",
      title: "Which browsers do you want your extension to support?",
      shortTitle: "Browser Compatibility",
      type: "checkbox",
      required: true,
      options: [
        { label: "Chrome", value: "chrome" },
        { label: "Firefox", value: "firefox" },
        { label: "Safari", value: "safari" },
        { label: "Edge", value: "edge" },
        { label: "Opera", value: "opera" },
      ],
      validation: {
        schema: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
        },
        errorMessage: "Please select at least one browser",
      },
    },
    {
      id: "development-approach",
      title: "What's your preferred development approach?",
      shortTitle: "Development Approach",
      description: "Choose the development style that best fits your project needs and timeline.",
      type: "radio",
      required: true,
      options: [
        { label: "Rapid MVP", value: "rapid_mvp" },
        { label: "Prototype with basic AI features", value: "basic_ai_prototype" },
        { label: "Fully-featured AI-powered extension", value: "full_ai_extension" },
      ],
      validation: {
        schema: {
          enum: ["rapid_mvp", "basic_ai_prototype", "full_ai_extension"],
        },
        errorMessage: "Please select a development approach",
      },
    },
    {
      id: "key-features",
      title: "Which AI-powered features are you interested in implementing?",
      shortTitle: "Key Features",
      type: "checkbox",
      required: true,
      options: [
        { label: "Natural Language Processing", value: "nlp" },
        { label: "Image recognition", value: "image_recognition" },
        { label: "Sentiment analysis", value: "sentiment_analysis" },
        { label: "Automated data extraction", value: "data_extraction" },
        { label: "Predictive text/autocomplete", value: "predictive_text" },
        { label: "Voice recognition/commands", value: "voice_recognition" },
      ],
      validation: {
        schema: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
        },
        errorMessage: "Please select at least one key feature",
      },
    },
    {
      id: "data-source",
      title: "What type of data will your extension primarily work with?",
      shortTitle: "Data Source",
      type: "radio",
      required: true,
      options: [
        { label: "First-party data (user inputs, browsing history)", value: "first_party" },
        { label: "Third-party data (APIs, external databases)", value: "third_party" },
        { label: "Both first-party and third-party data", value: "both" },
      ],
      validation: {
        schema: {
          enum: ["first_party", "third_party", "both"],
        },
        errorMessage: "Please select a data source type",
      },
    },
    {
      id: "api-integration",
      title: "What type of API integration do you need?",
      shortTitle: "API Integration",
      type: "select",
      required: true,
      options: [
        { label: "Browser APIs only", value: "browser_apis" },
        { label: "External REST APIs", value: "rest_apis" },
        { label: "AI service APIs (e.g., OpenAI, Google AI)", value: "ai_service_apis" },
        { label: "Custom backend API", value: "custom_backend_api" },
        { label: "Combination of multiple API types", value: "multiple_apis" },
      ],
      validation: {
        schema: {
          enum: [
            "browser_apis",
            "rest_apis",
            "ai_service_apis",
            "custom_backend_api",
            "multiple_apis",
          ],
        },
        errorMessage: "Please select an API integration option",
      },
    },
    {
      id: "target-sites",
      title: "On which types of websites will your extension primarily operate?",
      shortTitle: "Target Sites",
      type: "multiple",
      required: true,
      options: [
        { label: "Social media", value: "social_media" },
        { label: "E-commerce", value: "ecommerce" },
        { label: "Productivity tools", value: "productivity" },
        { label: "Content platforms", value: "content_platforms" },
        { label: "Search engines", value: "search_engines" },
        { label: "Custom web applications", value: "custom_web_apps" },
      ],
      validation: {
        schema: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
        },
        errorMessage: "Please select at least one type of target site",
      },
    },
    {
      id: "user-data-handling",
      title: "How will your extension handle user data?",
      shortTitle: "User Data Handling",
      type: "radio",
      required: true,
      options: [
        { label: "Local storage only", value: "local_storage" },
        { label: "Cloud storage", value: "cloud_storage" },
        { label: "Combination of local and cloud storage", value: "combined_storage" },
        { label: "No user data stored", value: "no_storage" },
      ],
      validation: {
        schema: {
          enum: ["local_storage", "cloud_storage", "combined_storage", "no_storage"],
        },
        errorMessage: "Please select a data handling approach",
      },
    },
    {
      id: "performance-requirements",
      title: "What are the performance requirements for your extension?",
      shortTitle: "Performance Requirements",
      type: "radio",
      required: true,
      options: [
        { label: "Low (occasional background tasks)", value: "low" },
        { label: "Medium (regular user interactions)", value: "medium" },
        { label: "High (constant real-time processing)", value: "high" },
      ],
      validation: {
        schema: {
          enum: ["low", "medium", "high"],
        },
        errorMessage: "Please select a performance requirement level",
      },
    },
    {
      id: "monetization",
      title: "How do you plan to monetize your extension?",
      shortTitle: "Monetization",
      type: "radio",
      required: true,
      options: [
        { label: "Free", value: "free" },
        { label: "One-time purchase", value: "one_time" },
        { label: "Subscription model", value: "subscription" },
        { label: "Freemium", value: "freemium" },
        { label: "Ad-supported", value: "ad_supported" },
      ],
      validation: {
        schema: {
          enum: ["free", "one_time", "subscription", "freemium", "ad_supported"],
        },
        errorMessage: "Please select a monetization strategy",
      },
    },
  ],
  result: {
    title: "Web Extension Complexity Score",
    description:
      "Based on your responses, we've calculated a complexity score for your AI-powered web extension project.",
    value: 0, // This would be calculated based on the answers
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

export default calculator;
