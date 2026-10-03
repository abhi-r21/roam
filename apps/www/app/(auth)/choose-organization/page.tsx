import { OrganizationSwitcher } from '@/components/organization/organization-switcher'

export default function ChooseOrganisationPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10 sm:px-6 bg-neutral-950">
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <OrganizationSwitcher />
      </div>
    </div>
  )
}
