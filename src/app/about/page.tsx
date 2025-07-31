import { Metadata } from 'next'
import { BookOpen, Users, Shield, Heart, Target, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - Racial Discrimination Terms',
  description: 'Learn about our mission to educate and promote understanding of racial discrimination terms through comprehensive, objective resources.',
  keywords: ['about', 'mission', 'education', 'racial discrimination', 'inclusion'],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* 英雄区域 */}
      <section className="gradient-bg py-20 px-4">
        <div className="container-responsive text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
            About Our Mission
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-3xl mx-auto">
            We believe that education is the foundation for creating more inclusive, 
            understanding, and respectful communities.
          </p>
        </div>
      </section>

      {/* 使命和愿景 */}
      <section className="py-16 px-4 bg-white">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                To provide comprehensive, objective, and educational resources about racial 
                discrimination terms, helping individuals understand the historical context, 
                impact, and implications of language in our society.
              </p>
              <p className="text-lg text-neutral-600 mb-6">
                We believe that knowledge is power, and by understanding the weight and 
                history behind certain terms, we can make more informed choices about our 
                language and its impact on others.
              </p>
              <p className="text-lg text-neutral-600">
                Our goal is to foster empathy, promote inclusive communication, and contribute 
                to the ongoing conversation about racial equality and social justice.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="card text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Education</h3>
                <p className="text-neutral-600 text-sm">
                  Providing accurate, well-researched information about racial discrimination terms
                </p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Empathy</h3>
                <p className="text-neutral-600 text-sm">
                  Fostering understanding and compassion through education
                </p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Inclusion</h3>
                <p className="text-neutral-600 text-sm">
                  Promoting inclusive language and communication practices
                </p>
              </div>
              <div className="card text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Excellence</h3>
                <p className="text-neutral-600 text-sm">
                  Maintaining high standards for accuracy and objectivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 我们的方法 */}
      <section className="py-16 px-4 bg-neutral-50">
        <div className="container-responsive">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12">
            Our Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Comprehensive Research</h3>
              <p className="text-neutral-600">
                Each term is thoroughly researched using academic sources, historical documents, 
                and contemporary analysis to provide accurate and complete information.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Objective Presentation</h3>
              <p className="text-neutral-600">
                We present information objectively, focusing on facts and historical context 
                rather than personal opinions or political agendas.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-900">Educational Focus</h3>
              <p className="text-neutral-600">
                Our content is designed to educate and inform, helping readers understand 
                the broader context and implications of language choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 内容标准 */}
      <section className="py-16 px-4 bg-white">
        <div className="container-responsive">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-12">
            Our Content Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900">Accuracy</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• All information is thoroughly fact-checked</li>
                <li>• Sources are properly cited and verified</li>
                <li>• Content is regularly reviewed and updated</li>
                <li>• Expert consultation when necessary</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900">Sensitivity</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Respectful treatment of sensitive topics</li>
                <li>• Consideration for diverse perspectives</li>
                <li>• Avoidance of sensationalism</li>
                <li>• Focus on educational value</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900">Completeness</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Historical context provided</li>
                <li>• Contemporary usage explained</li>
                <li>• Impact and implications discussed</li>
                <li>• Related terms and concepts included</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-neutral-900">Accessibility</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Clear, understandable language</li>
                <li>• Multiple learning formats</li>
                <li>• Mobile-friendly design</li>
                <li>• Inclusive content structure</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 免责声明 */}
      <section className="py-16 px-4 bg-neutral-900 text-white">
        <div className="container-responsive">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Important Disclaimer
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-neutral-300 mb-6">
              This resource is designed for educational purposes only. The content is intended 
              to promote understanding and awareness of racial discrimination issues through 
              objective, well-researched information.
            </p>
            <p className="text-lg text-neutral-300 mb-6">
              We do not condone or promote the use of discriminatory language. Instead, 
              we aim to help readers understand the historical context and impact of such 
              terms so they can make informed decisions about their language choices.
            </p>
            <p className="text-lg text-neutral-300">
              We encourage respectful dialogue and continuous learning about issues of 
              race, discrimination, and social justice.
            </p>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 px-4 bg-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you. 
            Your input helps us improve our educational resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Us
            </button>
            <button className="btn-outline">
              Submit Feedback
            </button>
          </div>
        </div>
      </section>
    </div>
  )
} 