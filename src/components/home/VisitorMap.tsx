'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import landTopology from 'world-atlas/land-110m.json';
import { useMessages } from '@/lib/i18n/useMessages';

interface VisitorMapProps {
    title?: string;
}

interface VisitorPoint {
    lat: number;
    lon: number;
    count: number;
}

const WIDTH = 960;
const HEIGHT = 500;

const landFeature = feature(
    landTopology as unknown as Topology,
    landTopology.objects.land as unknown as GeometryCollection
);

const projection = geoEqualEarth().fitSize([WIDTH, HEIGHT], { type: 'Sphere' } as never);
const landPath = geoPath(projection)(landFeature) || '';
const spherePath = geoPath(projection)({ type: 'Sphere' } as never) || '';

function radiusForCount(count: number): number {
    return Math.min(3 + Math.log2(count + 1) * 1.6, 12);
}

export default function VisitorMap({ title }: VisitorMapProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.visitorMap;
    const apiBase = process.env.NEXT_PUBLIC_VISITOR_MAP_API?.trim().replace(/\/$/, '');
    const [points, setPoints] = useState<VisitorPoint[]>([]);

    useEffect(() => {
        if (!apiBase) return;

        fetch(`${apiBase}/track`, { method: 'POST', keepalive: true }).catch(() => {});

        let cancelled = false;
        fetch(`${apiBase}/points`)
            .then((res) => res.json())
            .then((data: { points?: VisitorPoint[] }) => {
                if (!cancelled) setPoints(data.points || []);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };
    }, [apiBase]);

    if (!apiBase) {
        return null;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-2xl font-serif font-bold text-primary mb-4">{resolvedTitle}</h2>
            <div className="rounded border border-neutral-200/50 dark:border-neutral-700/50 bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
                <svg
                    viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                    className="w-full h-auto"
                    role="img"
                    aria-label="Map of approximate visitor locations"
                >
                    <path d={spherePath} className="fill-sky-50 dark:fill-slate-800/40" />
                    <path d={landPath} className="fill-neutral-300 dark:fill-neutral-600" />
                    {points.map((point, index) => {
                        const projected = projection([point.lon, point.lat]);
                        if (!projected) return null;
                        const [x, y] = projected;
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r={radiusForCount(point.count)}
                                className="fill-accent"
                                fillOpacity={0.65}
                            />
                        );
                    })}
                </svg>
            </div>
            <p className="text-xs text-neutral-500 mt-2">
                Approximate visitor locations, updated periodically.
            </p>
        </motion.section>
    );
}
