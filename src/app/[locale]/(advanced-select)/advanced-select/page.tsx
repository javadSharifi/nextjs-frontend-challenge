import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advanced Select Component',
  description: 'A highly customizable select component built with Tailwind CSS.',
};

export default function AdvancedSelectPage() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Advanced Select</h1>
      <p className="text-lg">This section is isolated and uses Tailwind CSS.</p>
      <div className="mt-8">
        <button className="btn btn-primary">DaisyUI Button</button>
      </div>
    </div>
  );
}
