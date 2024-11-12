import ClientOnly from '@/components/ClientOnly'
import ROICalculator from '@/components/ROICalculator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <ClientOnly>
        <ROICalculator />
      </ClientOnly>
    </main>
  )
}