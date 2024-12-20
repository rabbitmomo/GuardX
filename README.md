# GuardX
GuardX is a cutting-edge browser extension designed to autonomously detect and neutralize online phishing threats in real-time.

By leveraging advanced AI and machine learning models, GuardX ensures a seamless and secure online browsing experience.

It helps users identify and block malicious links, protecting them from phishing scams and providing peace of mind when interacting with unknown or suspicious websites.

# Features
1. Real-Time Threat Detection: Instantly detects phishing attempts and displays a warning before the user can proceed.

2. Dynamic Database Updates: Analyzes phishing websites and adds them to a constantly evolving database to improve future threat detection.

3. Cross-Browser Support: Compatible with all major browsers that support extensions.

4. AI-Powered Analysis: Powered by a robust machine learning model using ONNX, Scikit-learn, Support Vector Machine, and TF-IDF algorithms.

5. Seamless User Experience: Provides protection without interfering with normal browsing activities.

# Technology Stack
1. Framework: web-ext for cross-browser extension development.

2. Frontend: JavaScript, HTML and CSS for warning pages.

3. Database: Supabase and SQL for storing malicious websites.

4. Backend Server: Node.js for REST API implementation, hosted on Heroku.

5. Machine Learning: ONNX model and Scikit-learn for AI analysis. It uses Support Vector Machine (SVM) and TF-IDF algorithms for precision phishing detection. Model could be found on https://huggingface.co/pirocheto/phishing-url-detection

6. AI Analysis: OpenAI Artificial Intelligence Model powers the analysis for enhanced threat identification.

# How it works

1. User Interaction: The user clicks a link in a message or email.

2. GuardX Detection: The extension scans the link and determines its safety.

3. Action Taken:
    a. Safe Link: The user proceeds without interruption.
    b. Phishing Link: GuardX blocks access and displays a warning page.

4. Database Update: Malicious websites are added to GuardX’s database for continuous improvement.

# Installation

1. Clone this repository into your device.

2. Go to Google chrome / Microsoft Edge or any other browsers that supports extension

3. Click on extension section of browser

4. Open Developer mode

5. Select Load Unpacked package

6. Select the folder being cloned just now from Github

7. Enjoy this cutting edge real time cybersecurity mechanism

# Future Enhancements

1. Allow user to report all phishing website and add it to our database for continuos support on the GuardX community

2. Multi-language support for warning messages.

3. Integration with more AI models for enhanced detection capabilities.

