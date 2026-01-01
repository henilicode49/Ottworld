import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { Upload, X, Smartphone, Globe, Monitor } from 'lucide-react';

const CATEGORIES = ['Games', 'Productivity', 'Social', 'Utilities', 'Design', 'Education', 'Lifestyle', 'Health'];
const PLATFORMS = ['Android', 'iOS', 'Web', 'Windows', 'MacOS'];

export const AddApp = () => {
    const { user } = useAuth();
    const { addApp } = useData();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        fullDescription: '',
        category: CATEGORIES[0],
        version: '1.0.0',
        size: '15 MB',
        tags: '',
        iconUrl: '',
        apkUrl: '',
        screenshots: '', // Textarea input for comma/newline separated URLs
        supportedPlatforms: ['Android']
    });

    const handlePlatformChange = (platform) => {
        setFormData(prev => {
            const current = prev.supportedPlatforms;
            if (current.includes(platform)) {
                return { ...prev, supportedPlatforms: current.filter(p => p !== platform) };
            } else {
                return { ...prev, supportedPlatforms: [...current, platform] };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate upload delay
        setTimeout(() => {
            // Process Screenshots (split by newline or comma)
            const processedScreenshots = formData.screenshots
                .split(/[\n,]+/)
                .map(s => s.trim())
                .filter(s => s.length > 0);

            const newApp = {
                ...formData,
                slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
                // Use provided icon or fallback to seed
                iconUrl: formData.iconUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name}`,
                screenshots: processedScreenshots.length > 0 ? processedScreenshots : [
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
                    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80'
                ], // Fallback mocks if empty
                apkUrl: formData.apkUrl || '#',
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                vendorId: user.id,
                vendorName: user.name,
                // Ensure platforms is never empty
                supportedPlatforms: formData.supportedPlatforms.length > 0 ? formData.supportedPlatforms : ['Android']
            };

            addApp(newApp);
            setLoading(false);
            navigate('/vendor/apps');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold mb-2">Publish New App</h1>
            <p className="text-slate-400 mb-8">Fill in the details to submit your app for review.</p>

            <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">App Name *</label>
                                <Input
                                    required
                                    placeholder="e.g. Zen Focus"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Category *</label>
                                <select
                                    className="glass-input w-full"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Short Description *</label>
                            <Input
                                required
                                placeholder="Brief summary for list view (max 80 chars)"
                                maxLength={80}
                                value={formData.shortDescription}
                                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Description</label>
                            <TextArea
                                required
                                placeholder="Detailed explanations of features, benefits, and user guide..."
                                className="h-40"
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            />
                        </div>
                    </section>

                    {/* Media Assets */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Media Assets</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">App Icon URL</label>
                            <div className="flex gap-4 items-start">
                                <Input
                                    placeholder="https://..."
                                    value={formData.iconUrl}
                                    onChange={e => setFormData({ ...formData, iconUrl: e.target.value })}
                                    className="flex-1"
                                />
                                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                    {formData.iconUrl ? (
                                        <img src={formData.iconUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-xs text-slate-500">Preview</div>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-slate-500">Recommended: Square PNG, 512x512px</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Screenshots (URLs)</label>
                            <TextArea
                                placeholder="Paste image URLs here (one per line)..."
                                className="h-32 font-mono text-sm"
                                value={formData.screenshots}
                                onChange={e => setFormData({ ...formData, screenshots: e.target.value })}
                            />
                            <p className="text-xs text-slate-500">Supported: JPG, PNG. Recommended 16:9 aspect ratio.</p>
                        </div>
                    </section>

                    {/* Technical Details */}
                    <section className="space-y-4">
                        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Technical Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Version</label>
                                <Input
                                    placeholder="1.0.0"
                                    value={formData.version}
                                    onChange={e => setFormData({ ...formData, version: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Size</label>
                                <Input
                                    placeholder="e.g. 45 MB"
                                    value={formData.size}
                                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Download/APK URL</label>
                                <Input
                                    placeholder="https://..."
                                    value={formData.apkUrl}
                                    onChange={e => setFormData({ ...formData, apkUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 block mb-2">Supported Platforms</label>
                            <div className="flex flex-wrap gap-3">
                                {PLATFORMS.map(platform => (
                                    <button
                                        key={platform}
                                        type="button"
                                        onClick={() => handlePlatformChange(platform)}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${formData.supportedPlatforms.includes(platform)
                                                ? 'bg-purple-500 border-purple-500 text-white'
                                                : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Tags (comma separated)</label>
                            <Input
                                placeholder="Productivity, Tools, Finance..."
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </div>
                    </section>

                    <div className="pt-6 border-t border-white/5 flex items-center justify-end gap-4">
                        <Button type="button" variant="ghost" onClick={() => navigate('/vendor')}>Cancel</Button>
                        <Button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0">
                            {loading ? 'Submitting...' : 'Submit App for Review'}
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};
