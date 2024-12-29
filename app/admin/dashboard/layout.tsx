'use client';
import { useAuthStore } from '@/app/stores/authStore';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Header, Loading } from '../../components';
import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  TransitionChild,
} from '@headlessui/react';
import {
  ArrowDown3,
  CloseCircle,
  HambergerMenu,
  Logout,
  Verify,
} from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { IoCloudUploadSharp } from 'react-icons/io5';
import { TiMessages } from 'react-icons/ti';
import { MdSettingsSuggest, MdTouchApp } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { GrProjects } from 'react-icons/gr';
import { PiUsers } from 'react-icons/pi';
import { TfiStatsUp } from 'react-icons/tfi';

const navigation = [
  {
    name: 'Upload',
    href: '/admin/dashboard/upload',
    icon: IoCloudUploadSharp,
  },
  {
    name: 'Projects',
    href: '/admin/dashboard/projects',
    icon: GrProjects,
  },
  // {
  //   name: 'Messages',
  //   href: '/admin/dashboard/messages',
  //   icon: TiMessages,
  // },
  {
    name: 'Users',
    href: '/admin/dashboard/users',
    icon: PiUsers,
  },
  {
    name: 'Stats',
    href: '/admin/dashboard/stats',
    icon: TfiStatsUp,
  },
  // {
  //   name: 'Interactions',
  //   href: '/admin/dashboard/interactions',
  //   icon: MdTouchApp,
  // },
  {
    name: 'Settings',
    href: '/admin/dashboard/settings',
    icon: MdSettingsSuggest,
  },
];

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isAuthenticated,
    isLoading,
    loadUserFromLocalStorage,
    logout,
    loadAdminFromLocalStorage,
  } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAuthStore().user;
  const isActive = (href: any) => pathname === href;

  useEffect(() => {
    loadAdminFromLocalStorage();
  }, [loadAdminFromLocalStorage]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  return (
    <>
      <Toaster />
      <main>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <CloseCircle
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-4">
                <div className="pt-10">
                  <Image
                    src={`https://api.dicebear.com/9.x/identicon/svg?seed=admin`}
                    height={70}
                    width={70}
                    className="rounded-full border-4 border-white mx-auto"
                    alt="user-image"
                    unoptimized
                  />
                  <h3 className="text-white text-center mt-3 font-semibold">
                    {`${user?.firstName} ${user?.lastName}`}
                  </h3>
                  <p className="flex items-center text-white text-sm justify-center space-x-2">
                    <span>Admin</span>
                    <Verify color="#FFFFFF" size={12} />
                  </p>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-3">
                        {navigation.map((item, index) => (
                          <li key={index}>
                            <Link
                              href={item.href}
                              className={classNames(
                                isActive(item.href)
                                  ? 'bg-gray-50 text-primary'
                                  : 'text-white hover:bg-gray-50 hover:text-primary',
                                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  isActive(item.href)
                                    ? 'text-primary'
                                    : 'text-gray-400 group-hover:text-primary',
                                  'h-6 w-6 shrink-0'
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <button
                        onClick={handleLogout}
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-gray-50 hover:text-primary w-full"
                      >
                        <Logout
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-white group-hover:text-primary"
                        />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-primary px-6 pb-4">
            <div className="pt-10">
              <Image
                src={`https://api.dicebear.com/9.x/identicon/svg?seed=admin`}
                height={100}
                width={100}
                className="rounded-full border-4 border-white mx-auto"
                alt="user-image"
                unoptimized
              />
              <h3 className="text-white text-center mt-3 font-semibold">
                {'Admin'}
              </h3>
              {/* <p className="flex items-center text-white text-sm justify-center space-x-2">
                <span>Admin</span>
                <Verify color="#FFFFFF" size={16} />
              </p> */}
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-3">
                    {navigation.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className={classNames(
                            isActive(item.href)
                              ? 'bg-gray-50 text-primary'
                              : 'text-white hover:bg-gray-50 hover:text-primary',
                            'group flex gap-x-3 rounded-md p-4 text-sm font-semibold leading-6'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              isActive(item.href)
                                ? 'text-primary'
                                : 'text-gray-400 group-hover:text-primary',
                              'h-6 w-6 shrink-0'
                            )}
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <button
                    onClick={handleLogout}
                    className="group -mx-2 flex gap-x-3 rounded-md p-4 text-sm font-semibold leading-6 text-white hover:bg-gray-50 hover:text-primary w-full"
                  >
                    <CiLogout
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-white group-hover:text-primary"
                    />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-7xl lg:px-8 bg-white">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <HambergerMenu aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="h-6 w-px bg-gray-200 lg:hidden"
              />

              <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        alt="user img"
                        src={`https://api.dicebear.com/9.x/identicon/svg?seed=admin`}
                        height={36}
                        width={36}
                        className="h-9 w-9 rounded-full bg-gray-50 border-2 border-primary"
                        unoptimized
                      />
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          aria-hidden="true"
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        >
                          Admin
                        </span>
                        <ArrowDown3
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 hidden text-gray-400"
                        />
                      </span>
                    </MenuButton>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
