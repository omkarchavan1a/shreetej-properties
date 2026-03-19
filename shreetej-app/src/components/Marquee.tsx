export default function Marquee() {
  const items = [
    "100% Legal Security",
    "Verified Title Deeds",
    "Free Document Verification",
    "1500+ Successful Transactions",
    "Post-Sale Commitment",
    "100% Loan Assistance",
    "15+ Years of Trust",
    "Quality Construction",
  ];

  // Repeat items to ensure seamless infinite scroll
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="bg-gradient-to-br from-gold to-gold-light py-4 overflow-hidden whitespace-nowrap">
      <div className="inline-flex animate-marquee">
        {marqueeItems.map((item, index) => (
          <span
            key={index}
            className="px-8 text-xs tracking-[3px] uppercase font-bold text-navy inline-flex items-center space-x-4"
          >
            <span>{item}</span>
            <span className="text-[8px] opacity-60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
