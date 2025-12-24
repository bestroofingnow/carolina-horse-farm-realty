import Link from "next/link";
import {
  Phone,
  Mail,
  Award,
  Heart,
  Users,
  MapPin,
  Shield,
  Star,
  TrendingUp,
  Home,
  ChevronRight,
  Handshake,
  Target,
  Building2,
} from "lucide-react";
import { teamMembers } from "@/lib/mock-data";
import { TeamMember } from "@/types";

// Extended team members for display (fallback if mock-data has limited entries)
const extendedTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Lara Murphy",
    title: "Broker / Owner",
    phone: "(704) 555-0123",
    email: "lara@carolinahorsefarmrealty.com",
    photo: "/images/team/lara-murphy.jpg",
    bio: "With over 15 years of experience in equestrian real estate, Lara has helped hundreds of families find their perfect horse property. A lifelong equestrian herself, she understands the unique needs of horse owners and brings unmatched expertise to every transaction.",
    specialties: ["Horse Farms", "Equestrian Estates", "Land for Horses"],
  },
  {
    id: "2",
    name: "Michael Patterson",
    title: "Senior Agent",
    phone: "(704) 555-0124",
    email: "michael@carolinahorsefarmrealty.com",
    photo: "/images/team/michael-patterson.jpg",
    bio: "Michael brings a decade of experience in luxury real estate combined with a passion for the equestrian lifestyle. His background in agricultural property assessment ensures clients receive expert guidance on land value and facility quality.",
    specialties: ["Luxury Estates", "Training Facilities", "Investment Properties"],
  },
  {
    id: "3",
    name: "Sarah Chen",
    title: "Equestrian Property Specialist",
    phone: "(704) 555-0125",
    email: "sarah@carolinahorsefarmrealty.com",
    photo: "/images/team/sarah-chen.jpg",
    bio: "Sarah is a competitive dressage rider who turned her passion for horses into a thriving real estate career. She specializes in helping buyers find properties that meet their specific equestrian discipline requirements.",
    specialties: ["Dressage Facilities", "Show Barns", "First-Time Buyers"],
  },
];

const serviceAreas = [
  {
    name: "Charlotte",
    description: "The heart of the region with access to world-class equestrian facilities and urban amenities.",
  },
  {
    name: "Waxhaw",
    description: "Premier equestrian community known for rolling hills and established horse farms.",
  },
  {
    name: "Mooresville",
    description: "Lake Norman area offering scenic properties with excellent pastureland.",
  },
  {
    name: "Huntersville",
    description: "Growing equestrian community with easy access to Charlotte.",
  },
  {
    name: "Cornelius",
    description: "Lakefront and pastoral properties near Davidson.",
  },
  {
    name: "Davidson",
    description: "Charming college town atmosphere with beautiful surrounding horse country.",
  },
  {
    name: "Matthews",
    description: "Historic area with established equestrian neighborhoods.",
  },
  {
    name: "Mint Hill",
    description: "Rural character with proximity to city conveniences.",
  },
  {
    name: "Pineville",
    description: "Southern Charlotte access with affordable acreage options.",
  },
  {
    name: "Weddington",
    description: "Upscale community with large-lot zoning ideal for horses.",
  },
  {
    name: "Tryon",
    description: "World-renowned equestrian destination, home to Tryon International Equestrian Center.",
  },
];

const valuePropositions = [
  {
    icon: Award,
    title: "Expert Equestrian Knowledge",
    description: "Our team consists of experienced riders and horse owners who understand everything from stall requirements to pasture management.",
  },
  {
    icon: MapPin,
    title: "Deep Local Expertise",
    description: "We know every trail, every barn, and every equestrian community in the Charlotte Metro area.",
  },
  {
    icon: Shield,
    title: "Trusted Advisors",
    description: "We provide honest assessments of facilities, land quality, and property values to protect your investment.",
  },
  {
    icon: Target,
    title: "Tailored Matching",
    description: "We match your specific equestrian discipline and lifestyle needs with the perfect property.",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "250+", label: "Properties Sold" },
  { value: "$500M+", label: "Total Sales Volume" },
  { value: "98%", label: "Client Satisfaction" },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-forest-100 hover:shadow-xl transition-all duration-300">
      {/* Photo Placeholder */}
      <div className="relative h-72 bg-gradient-to-br from-forest-700 to-forest-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <Users className="w-24 h-24 text-forest-300 opacity-50" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-forest-900 mb-1">{member.name}</h3>
        <p className="text-saddle-600 font-medium mb-4">{member.title}</p>
        <p className="text-forest-600 text-sm leading-relaxed mb-4">{member.bio}</p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-4">
          {member.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-forest-100 text-forest-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Contact Info */}
        <div className="border-t border-forest-100 pt-4 space-y-2">
          <a
            href={`tel:${member.phone.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-2 text-forest-600 hover:text-saddle-600 transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            <span>{member.phone}</span>
          </a>
          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-2 text-forest-600 hover:text-saddle-600 transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            <span>{member.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-md border border-forest-100 hover:shadow-lg transition-all duration-300">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest-100 text-forest-700 mb-5">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-forest-900 mb-3">{title}</h3>
      <p className="text-forest-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function ServiceAreaCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border border-forest-100 hover:shadow-md hover:border-saddle-200 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-saddle-100 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-saddle-600" />
        </div>
        <div>
          <h4 className="font-bold text-forest-900 mb-1">{name}</h4>
          <p className="text-forest-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  // Use extended team members if mock-data has limited entries
  const displayTeamMembers = teamMembers.length >= 3 ? teamMembers : extendedTeamMembers;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="https://storage.googleapis.com/msgsndr/OTLRU5jdjnOObaWbFyny/media/6949d472ee99d010cab14b62.gif"
            alt="Carolina Horse Farm"
            className="w-full h-full object-cover"
            fetchPriority="high"
            loading="eager"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-forest-900/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              About Carolina Horse Farm Realty
            </h1>
            <p className="text-xl sm:text-2xl text-cream-200 leading-relaxed max-w-3xl mx-auto">
              Dedicated to helping horse enthusiasts find their perfect equestrian property in the Carolina Piedmont.
              Our passion for horses drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-forest-600 leading-relaxed">
                <p>
                  Carolina Horse Farm Realty was founded with a simple yet powerful vision: to be the trusted partner
                  for horse lovers seeking their dream equestrian property in the Charlotte Metro area.
                </p>
                <p>
                  As lifelong equestrians ourselves, we understood the frustration of working with agents who
                  didn&apos;t grasp the unique requirements of horse properties. The difference between a good
                  pasture and a great one, the importance of proper barn ventilation, the need for safe fencing
                  and adequate turnout space these details matter immensely to horse owners.
                </p>
                <p>
                  That&apos;s why we built a team of agents who are not just real estate professionals, but
                  genuine horse people. We ride, we train, we compete, and we care for our own horses. This
                  firsthand experience means we can evaluate properties with an expert eye and advocate for
                  our clients&apos; equestrian needs.
                </p>
                <p>
                  Today, Carolina Horse Farm Realty is the region&apos;s premier equestrian real estate brokerage,
                  helping families across the Carolinas find properties that support their equestrian dreams.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/properties"
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  View Properties
                </Link>
                <Link
                  href="/contact"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Handshake className="w-5 h-5" />
                  Connect With Us
                </Link>
              </div>
            </div>

            {/* Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-forest-700 to-forest-900 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building2 className="w-32 h-32 text-forest-300 opacity-50" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest-900/80 to-transparent p-6">
                  <p className="text-cream-100 text-sm">Our office in the heart of Charlotte&apos;s equestrian country</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-saddle-500 rounded-xl -z-10 opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-forest-500 rounded-xl -z-10 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-forest-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-cream-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-forest-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-forest-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              Our team of dedicated equestrian real estate professionals combines a passion
              for horses with expert market knowledge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTeamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              Why Choose Carolina Horse Farm Realty
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              When it comes to equestrian properties, experience and expertise matter.
              Here&apos;s what sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((prop, index) => (
              <ValueCard key={index} {...prop} />
            ))}
          </div>

          {/* Additional Achievements */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-forest-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-forest-900 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-saddle-600" />
                  Our Achievements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Top-rated equestrian real estate brokerage in the Charlotte Metro area</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Featured in Horse & Style Magazine and Carolina Horse Country</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Proud sponsor of local equestrian events and youth riding programs</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Member of the Carolina Horse Country Association</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-forest-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-saddle-600" />
                  Our Commitment
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Personalized service tailored to your unique equestrian needs</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Comprehensive property evaluations including equestrian facilities</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Network of trusted equine professionals for inspections and advice</span>
                  </li>
                  <li className="flex items-start gap-3 text-forest-600">
                    <ChevronRight className="w-5 h-5 text-saddle-600 flex-shrink-0 mt-0.5" />
                    <span>Ongoing support even after closing to ensure your success</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-20 bg-cream-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-900 mb-4">
              Areas We Serve
            </h2>
            <p className="text-lg text-forest-600 max-w-2xl mx-auto">
              From the rolling hills of Waxhaw to the world-class facilities of Tryon,
              we serve the premier equestrian communities of the Carolina Piedmont.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceAreas.map((area, index) => (
              <ServiceAreaCard key={index} name={area.name} description={area.description} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/properties"
              className="btn-primary inline-flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              Explore Properties in These Areas
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-forest-800 to-forest-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Search?
          </h2>
          <p className="text-xl text-cream-200 mb-10 max-w-2xl mx-auto">
            Whether you&apos;re looking for your first horse property or upgrading to your dream
            equestrian estate, we&apos;re here to help you every step of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/contact"
              className="btn-secondary flex items-center gap-2 text-lg px-10 py-4"
            >
              <Mail className="w-5 h-5" />
              Contact Us Today
            </Link>
            <a
              href="tel:+17045550123"
              className="flex items-center gap-3 text-cream-100 hover:text-white transition-colors text-lg"
            >
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <span className="font-medium">(704) 555-0123</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
