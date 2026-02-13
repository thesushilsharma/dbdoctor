import { Activity, BarChart3, Database, Gauge, Sparkles, Target, Zap } from 'lucide-react';
import { HeroSection } from '@/components/hero-section';
import { FeatureCard } from '@/components/feature-card';
import { TechCard } from '@/components/tech-card';
import { DatabaseBadge } from '@/components/database-badge';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20 pointer-events-none" />

      {/* Gradient Orbs with advanced animation */}
      <div className="fixed top-0 -left-20 w-[40rem] h-[40rem] bg-primary/20 rounded-full filter blur-[120px] animate-blob pointer-events-none" />
      <div className="fixed top-0 -right-20 w-[40rem] h-[40rem] bg-accent/20 rounded-full filter blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="fixed -bottom-40 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] bg-chart-1/10 rounded-full filter blur-[140px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Grid */}
        <section className="container mx-auto px-6 py-40">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
              <span className="bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Powerful Features
              </span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">Everything you need to optimize your database performance, built with the latest diagnostics technology.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              icon={Target}
              title="Query Analysis"
              description="Identify slow queries and execution bottlenecks with precision diagnostics"
              gradient="from-primary to-accent"
            />
            <FeatureCard
              icon={Gauge}
              title="Performance Metrics"
              description="Real-time monitoring of CPU, memory, I/O, and connection pools"
              gradient="from-accent to-chart-5"
            />
            <FeatureCard
              icon={Sparkles}
              title="Index Recommendations"
              description="Discover missing indexes and identify unused ones automatically"
              gradient="from-chart-5 to-chart-4"
            />
            <FeatureCard
              icon={BarChart3}
              title="Visual Dashboards"
              description="Beautiful, interactive charts powered by D3.js and Recharts"
              gradient="from-chart-2 to-primary"
            />
            <FeatureCard
              icon={Database}
              title="Multi-Database Support"
              description="PostgreSQL, MySQL, Oracle, MongoDB, SQL Server, and more"
              gradient="from-chart-2 to-chart-1"
            />
            <FeatureCard
              icon={Activity}
              title="AI Optimization"
              description="Smart recommendations powered by advanced analytics"
              gradient="from-emerald-500 to-chart-2"
            />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="container mx-auto px-6 py-40 relative">
          <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(circle_at_center,black,transparent)] pointer-events-none" />
          
          <div className="text-center mb-32 space-y-6 relative z-10">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
              <span className="bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Built with Modern Tech
              </span>
            </h2>
            <p className="text-muted-foreground text-xl md:text-2xl font-medium">Powered by cutting-edge JavaScript ecosystem and performant engines.</p>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-10">
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
                technologies={['DuckDB-Wasm', 'TensorFlow.js']}
                color="pink"
              />
              <TechCard
                category="Database Support"
                technologies={['PostgreSQL', 'MySQL', 'MongoDB', 'Redis']}
                color="blue"
              />
            </div>
          </div>
        </section>

        {/* Database Support Section */}
        <section className="container mx-auto px-6 py-40 border-t border-border/20">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Universal Support
              </span>
            </h2>
            <p className="text-muted-foreground text-xl font-medium">Connect any database and start diagnosing instantly.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
            <DatabaseBadge name="PostgreSQL" colorClass="text-primary" />
            <DatabaseBadge name="MySQL" colorClass="text-chart-2" />
            <DatabaseBadge name="MongoDB" colorClass="text-accent" />
            <DatabaseBadge name="Oracle" colorClass="text-chart-1" />
            <DatabaseBadge name="SQL Server" colorClass="text-chart-4" />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-40">
          <div className="max-w-5xl mx-auto relative overflow-hidden group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 via-accent/20 to-chart-1/20 opacity-50 blur-3xl group-hover:opacity-80 transition-opacity duration-1000" />
            
            <div className="relative z-10 text-center bg-card/40 backdrop-blur-3xl border-2 border-border/50 rounded-[3rem] p-16 md:p-24 shadow-2xl transition-all duration-500 hover:border-primary/30">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                <span className="bg-linear-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                  Ready to Optimize
                </span>
                <br />
                <span className="bg-linear-to-r from-primary via-accent to-chart-1 bg-clip-text text-transparent">
                  Your Database?
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
                Join developers worldwide who trust DBDoctor for high-precision database performance optimization and real-time diagnostics.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button
                  type="button"
                  size="lg"
                  className="group/btn relative h-16 px-12 bg-primary text-primary-foreground rounded-2xl font-black text-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_-10px] hover:shadow-primary/50 border-0 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Diagnosing Now
                    <Zap className="w-6 h-6 group-hover/btn:rotate-12 group-hover/btn:fill-current transition-all" />
                  </span>
                  <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer" />
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-16 px-12 bg-card/50 backdrop-blur-xl border-border/50 rounded-2xl font-bold text-xl hover:bg-muted hover:border-border transition-all hover:scale-105 active:scale-95"
                >
                  Read the Docs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-20 border-t border-border/50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Database className="w-6 h-6 text-primary" />
                <span className="text-xl font-black tracking-tighter">DBDOCTOR</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
                Precision Database Diagnostics
              </p>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              <a href="/" className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors">Discord</a>
            </div>

            <div className="text-muted-foreground font-medium text-sm">
              <p>© 2026 DBDoctor. Open Source • MIT License</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
