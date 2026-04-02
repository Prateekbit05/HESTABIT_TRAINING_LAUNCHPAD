import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Profile - Start Bootstrap',
  description: 'User profile page',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Go Back Link */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Go back
        </Link>
      </div>

      {/* Profile Card */}
      <div className="mx-auto max-w-6xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Image and Bio */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="relative h-64 w-full overflow-hidden rounded-lg">
                <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-300"></div>
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 flex items-center justify-center text-6xl text-slate-400">
                  👤
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Bio</h3>
              <p className="text-sm leading-relaxed text-slate-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet odio augue, in dabibus lacus imperdiet ut. Quisque elementum placerat neque rhoncus tempus. Cras id suscipit diam, sit amet rutrum rutrum. Vestibulum rutrum elit lacinia sapien porta pulvinar. neque rhoncus tempus. Cras id suscipit diam, sit amet rutrum rutrum. Vestibulum rutrum elit lacinia sapien porta pulvinar.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="#"
                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Personal Information */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Name</div>
                <div className="text-base text-blue-600">Nina Valentine</div>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">LinkedIn</div>
                <Link href="https://linkedin.com" className="text-base text-blue-600 hover:underline">
                  linkedin.com
                </Link>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Job Title</div>
                <div className="text-base text-slate-700">Actress</div>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Twitter</div>
                <Link href="https://x.com" className="text-base text-blue-600 hover:underline">
                  www.x.com
                </Link>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Email</div>
                <Link href="mailto:nina_val@example.com" className="text-base text-blue-600 hover:underline">
                  nina_val@example.com
                </Link>
              </div>

              <div className="border-b border-slate-200 pb-4">
                <div className="mb-1 text-xs font-semibold uppercase text-slate-500">Facebook</div>
                <Link href="https://facebook.com" className="text-base text-blue-600 hover:underline">
                  facebook.com
                </Link>
              </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-lg bg-slate-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Additional Information</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Phone:</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Location:</span>
                  <span>Los Angeles, CA</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">Member Since:</span>
                  <span>January 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// Profile page: Next.js user profile page with TailwindCSS card layout and nested routing
