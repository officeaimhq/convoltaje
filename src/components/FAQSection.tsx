import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS, FAQ_CATEGORIES, type FAQItem } from "@/lib/faq-data";

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("general");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = FAQ_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <HelpCircle className="w-12 h-12 text-secondary mx-auto" />
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Resuelve tus dudas sobre instalación, baterías, consumo energético y
            más. Si no encuentras tu respuesta, contáctanos por WhatsApp.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {FAQ_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setExpandedId(null);
              }}
              variant={
                selectedCategory === category.id ? "default" : "outline"
              }
              className={`font-accent transition-all ${
                selectedCategory === category.id
                  ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  : "hover:border-secondary"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-3">
          {filteredFAQs.map((faq) => (
            <Card
              key={faq.id}
              className="overflow-hidden border-border hover:border-secondary/50 transition-colors"
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors text-left"
              >
                <h3 className="font-accent text-foreground flex-1 text-lg">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded Content */}
              {expandedId === faq.id && (
                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                  <p className="text-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-8 bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/30">
            <div className="text-center">
              <h3 className="font-display text-2xl text-foreground mb-3">
                ¿Aún tienes dudas?
              </h3>
              <p className="text-muted-foreground mb-6">
                Nuestro equipo de expertos está disponible 24/7 por WhatsApp
                para responder todas tus preguntas y ayudarte a elegir el mejor
                sistema solar para ti.
              </p>
              <Button
                onClick={() => {
                  const message = "Hola, tengo preguntas sobre los sistemas solares de Convoltaje.";
                  const encodedMessage = encodeURIComponent(message);
                  const whatsappUrl = `https://wa.me/5355144097?text=${encodedMessage}`;
                  window.open(whatsappUrl, "_blank");
                }}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-accent px-8 py-3"
              >
                💬 Contactar por WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
