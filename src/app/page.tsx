import { Activity, BarChart3, Database, Gauge, Sparkles, Target, Zap } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';
import { FeatureCard } from '@/components/feature-card';
import { TechCard } from '@/components/tech-card';
import { DatabaseBadge } from '@/components/database-badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* Gradient Orbs */}
      <div className="fixed top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="fixed top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="fixed -bottom-8 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <div className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Everything you need to optimize your database performance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Target}
              title="Query Analysis"
              description="Identify slow queries and execution bottlenecks with precision diagnostics"
              gradient="from-indigo-500 to-purple-500"
            />
            <FeatureCard
              icon={Gauge}
              title="Performance Metrics"
              description="Real-time monitoring of CPU, memory, I/O, and connection pools"
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={Sparkles}
              title="Index Recommendations"
              description="Discover missing indexes and identify unused ones automatically"
              gradient="from-pink-500 to-rose-500"
            />
            <FeatureCard
              icon={BarChart3}
              title="Visual Dashboards"
              description="Beautiful, interactive charts powered by D3.js and Recharts"
              gradient="from-blue-500 to-indigo-500"
            />
            <FeatureCard
              icon={Database}
              title="Multi-Database Support"
              description="PostgreSQL, MySQL, Oracle, MongoDB, SQL Server, and more"
              gradient="from-cyan-500 to-blue-500"
            />
            <FeatureCard
              icon={Activity}
              title="AI Optimization"
              description="Smart recommendations powered by advanced analytics"
              gradient="from-emerald-500 to-cyan-500"
            />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Built with Modern Tech
              </span>
            </h2>
            <p className="text-slate-400 text-lg">Powered by cutting-edge JavaScript ecosystem</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <TechCard
                category="Data Processing"
                technologies={['Arquero', 'Polars.js', 'Danfo.js']}
                color="indigo"
              />
              <TechCard
                category="Visualization"
                technologies={['D3.js', 'Recharts', 'React']}
                color="purple"
              />
              <TechCard
                category="Analysis"
                technologies={['simple-statistics', 'Lodash', 'mathjs']}
                color="pink"
              />
              <TechCard
                category="Framework"
                technologies={['Next.js 16', 'TypeScript', 'Tailwind CSS']}
                color="blue"
              />
            </div>
          </div>
        </section>

        {/* Database Support */}
        <section className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Universal Database Support
              </span>
            </h2>
            <p className="text-slate-400 text-lg">One platform for all your databases</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <DatabaseBadge name="PostgreSQL" colorClass="bg-blue-500/10 border-blue-500/30 text-blue-400" />
            <DatabaseBadge name="MySQL" colorClass="bg-orange-500/10 border-orange-500/30 text-orange-400" />
            <DatabaseBadge name="Oracle" colorClass="bg-red-500/10 border-red-500/30 text-red-400" />
            <DatabaseBadge name="MongoDB" colorClass="bg-green-500/10 border-green-500/30 text-green-400" />
            <DatabaseBadge name="SQL Server" colorClass="bg-purple-500/10 border-purple-500/30 text-purple-400" />
            <DatabaseBadge name="MariaDB" colorClass="bg-cyan-500/10 border-cyan-500/30 text-cyan-400" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                Ready to Optimize Your Database?
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join developers worldwide who trust DBDoctor for database performance optimization
            </p>
            <Button
              type="button"
              size="lg"
              className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-xl overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50 border-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Diagnosing Now
                <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="text-center text-slate-400">
            <p className="mb-2">Open Source • MIT License</p>
            <p className="text-sm">Built with ❤️ for the developer community</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
