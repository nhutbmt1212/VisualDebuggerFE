'use client';

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const pricingPlans = [
    {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect for side projects and testing',
        features: [
            '100 MB storage per project',
            '1,000 events/month',
            '1 project',
            '7 days data retention',
            'Basic event tracking',
            'Community support',
        ],
        limitations: [
            'No real-time streaming',
            'No custom integrations',
            'No team collaboration',
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Pro',
        price: '$29',
        period: 'per month',
        description: 'For professional developers and small teams',
        features: [
            '5 GB storage per project',
            'Up to 10 projects',
            '100,000 events/month',
            'Unlimited projects',
            '30 days data retention',
            'Real-time WebSocket streaming',
            'Advanced filtering & search',
            'Custom integrations',
            'Email support',
            'Team collaboration (up to 5)',
        ],
        limitations: [],
        cta: 'Start Free Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        period: 'contact us',
        description: 'For large teams and mission-critical applications',
        features: [
            'Unlimited events',
            'Unlimited projects',
            'Unlimited data retention',
            'Dedicated infrastructure',
            'SLA guarantee (99.99%)',
            'Priority support',
            'Custom integrations',
            'Unlimited team members',
            'On-premise deployment',
            'Advanced security & compliance',
        ],
        limitations: [],
        cta: 'Contact Sales',
        popular: false,
    },
];

export function Pricing() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <section id="pricing" className="py-32 px-4 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                        Pricing
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Simple, transparent pricing
                    </h3>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                        Choose the plan that fits your needs. All plans include core debugging features.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1 bg-zinc-900 rounded-lg border border-zinc-800">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all ${billingCycle === 'monthly'
                                ? 'bg-purple-600 text-white'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-md font-semibold transition-all ${billingCycle === 'yearly'
                                ? 'bg-purple-600 text-white'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 ${plan.popular
                                ? 'bg-gradient-to-b from-purple-900/20 to-zinc-900 border-2 border-purple-500'
                                : 'bg-zinc-900/50 border border-zinc-800'
                                } hover:border-purple-500/50 transition-all`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-sm font-bold rounded-full">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                                <p className="text-zinc-400 text-sm mb-6">{plan.description}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-white">
                                        {plan.price === 'Custom' ? plan.price : plan.price}
                                    </span>
                                    {plan.price !== 'Custom' && (
                                        <span className="text-zinc-500">
                                            /{billingCycle === 'yearly' ? 'year' : plan.period}
                                        </span>
                                    )}
                                </div>
                                {billingCycle === 'yearly' && plan.price !== '$0' && plan.price !== 'Custom' && (
                                    <p className="text-sm text-green-400 mt-2">
                                        ${Math.floor(parseInt(plan.price.replace('$', '')) * 12 * 0.8)}/year (save 20%)
                                    </p>
                                )}
                            </div>

                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${plan.popular
                                    ? 'bg-purple-600 hover:bg-purple-500 text-white'
                                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                                    }`}
                            >
                                {plan.cta}
                            </button>

                            <div className="space-y-4">
                                <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                                    Features
                                </p>
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <Check className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                                        <span className="text-zinc-300 text-sm">{feature}</span>
                                    </div>
                                ))}

                                {plan.limitations.length > 0 && (
                                    <>
                                        <div className="border-t border-zinc-800 my-6" />
                                        <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                                            Not included
                                        </p>
                                        {plan.limitations.map((limitation, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <X className="text-zinc-600 flex-shrink-0 mt-0.5" size={18} />
                                                <span className="text-zinc-500 text-sm">{limitation}</span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-3xl mx-auto">
                    <h4 className="text-2xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h4>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I change plans later?',
                                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                            },
                            {
                                q: 'What happens when I exceed my event limit?',
                                a: "We'll notify you when you're approaching your limit. You can upgrade anytime to avoid service interruption.",
                            },
                            {
                                q: 'Do you offer refunds?',
                                a: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.',
                            },
                            {
                                q: 'Is there a free trial?',
                                a: 'Yes! The Pro plan includes a 14-day free trial. No credit card required.',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                                <h5 className="text-lg font-semibold text-white mb-2">{faq.q}</h5>
                                <p className="text-zinc-400">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-24 text-center">
                    <p className="text-zinc-400 mb-4">Still have questions?</p>
                    <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-semibold transition-all">
                        Contact Sales
                    </button>
                </div>
            </div>
        </section>
    );
}
