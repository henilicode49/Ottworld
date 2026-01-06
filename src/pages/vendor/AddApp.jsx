import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/button';
import { Input, TextArea } from '../../components/ui/Input';
import { Upload, X, Smartphone, Globe, Monitor, AlertCircle } from 'lucide-react';

const CATEGORIES = ['Games', 'Productivity', 'Social', 'Utilities', 'Design', 'Education', 'Lifestyle', 'Health'];
const PLATFORMS = ['Android', 'iOS', 'Web', 'Windows', 'MacOS'];

export const AddApp = () => {
    const { user } = useAuth();
    const { addApp, updateApp, apps } = useData();
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL for edit mode
    const [loading, setLoading] = useState(false);

    const isEditMode = !!id;

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
        supportedPlatforms: ['Android'],
        updateChanges: '', // New field for update changes
        appType: 'apk', // 'apk' | 'website'
        websiteUrl: '',
        apkFile: null,
        iconFile: null
    });

    // Pre-fill form data if in edit mode
    useEffect(() => {
        if (isEditMode && apps.length > 0) {
            const appToEdit = apps.find(app => app.id === id);
            if (appToEdit && appToEdit.vendorId === user.id) {
                setFormData({
                    name: appToEdit.name,
                    shortDescription: appToEdit.shortDescription,
                    fullDescription: appToEdit.fullDescription,
                    category: appToEdit.category,
                    version: appToEdit.version,
                    size: appToEdit.size,
                    tags: Array.isArray(appToEdit.tags) ? appToEdit.tags.join(', ') : appToEdit.tags,
                    iconUrl: appToEdit.iconUrl,
                    apkUrl: '', // DO NOT pre-fill APK URL - force re-upload
                    screenshots: Array.isArray(appToEdit.screenshots) ? appToEdit.screenshots.join('\n') : appToEdit.screenshots,
                    supportedPlatforms: appToEdit.supportedPlatforms || ['Android'],
                    updateChanges: '', // Always empty for new updates
                    appType: appToEdit.appType || (appToEdit.websiteUrl || (appToEdit.apkUrl && !appToEdit.apkUrl.endsWith('.apk') && !appToEdit.apkUrl.endsWith('.aab')) ? 'website' : 'apk'),
                    websiteUrl: appToEdit.websiteUrl || ((appToEdit.appType === 'website' || (!appToEdit.appType && appToEdit.apkUrl && !appToEdit.apkUrl.endsWith('.apk'))) ? appToEdit.apkUrl : ''),
                    apkFile: null
                });
            } else if (appToEdit && appToEdit.vendorId !== user.id) {
                alert('You cannot edit this app');
                navigate('/vendor/apps');
            }
        }
    }, [isEditMode, id, apps, user.id, navigate]);

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

        // Validate based on App Type
        if (formData.appType === 'apk') {
            if ((!formData.apkUrl || formData.apkUrl.trim() === '') && !formData.apkFile) {
                alert('Please provide an App Package URL (APK/EXE) or upload a file');
                return;
            }
        } else {
            if (!formData.websiteUrl || formData.websiteUrl.trim() === '') {
                alert('Please provide a Website URL');
                return;
            }
        }

        setLoading(true);

        // Simulate upload delay
        setTimeout(() => {
            // Process Screenshots (split by newline or comma)
            const processedScreenshots = formData.screenshots
                .split(/[\n,]+/)
                .map(s => s.trim())
                .filter(s => s.length > 0);

            const appData = {
                ...formData,
                slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
                // Use provided icon or fallback to seed
                // Use provided icon or fallback to seed
                iconUrl: formData.iconFile ? URL.createObjectURL(formData.iconFile) : (formData.iconUrl || `https://api.dicebear.com/7.x/shapes/svg?seed=${formData.name}`),
                screenshots: processedScreenshots.length > 0 ? processedScreenshots : [
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
                    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80'
                ], // Fallback mocks if empty
                apkUrl: formData.appType === 'apk' ? formData.apkUrl : formData.websiteUrl,
                websiteUrl: formData.appType === 'website' ? formData.websiteUrl : '',
                // If it's a file upload, in a real app we'd upload it and get a URL. 
                // Here we just keep the existing logic or use the mock URL if provided.
                apkFile: formData.apkFile,
                fileName: formData.apkFile ? formData.apkFile.name : (formData.appType === 'apk' ? (formData.apkUrl.split('/').pop().includes('.') ? formData.apkUrl.split('/').pop() : `${formData.name.replace(/\s+/g, '-')}.apk`) : ''),
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                vendorId: user.id,
                vendorName: user.name,
                // Ensure platforms is never empty
                supportedPlatforms: formData.supportedPlatforms.length > 0 ? formData.supportedPlatforms : ['Android'],
                // Include updateChanges if in edit mode
                updateChanges: isEditMode ? formData.updateChanges : undefined
            };

            if (isEditMode) {
                // Update existing app
                updateApp(id, { ...appData, status: 'review' }); // Set to review for admin approval
            } else {
                // Add new app
                addApp(appData);
            }

            setLoading(false);
            navigate('/vendor/apps');
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 px-2 md:px-0">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {isEditMode ? 'Update App' : 'Publish New App'}
            </h1>
            <p className="text-sm md:text-base text-slate-400 mb-6 md:mb-8">
                {isEditMode ? 'Update your app details and submit for review.' : 'Fill in the details to submit your app for review.'}
            </p>

            <GlassCard className="p-4 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h3 className="text-base md:text-lg font-bold text-white border-b border-white/10 pb-2">Basic Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">App Name *</label>
                                <Input
                                    required
                                    placeholder="e.g. Zen Focus"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">Category *</label>
                                <select
                                    className="glass-input w-full py-2 text-sm"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">Short Description *</label>
                            <Input
                                required
                                placeholder="Brief summary for list view (max 80 chars)"
                                maxLength={80}
                                value={formData.shortDescription}
                                onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                                className="py-2 text-sm"
                            />
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">Full Description</label>
                            <TextArea
                                required
                                placeholder="Detailed explanations of features, benefits, and user guide..."
                                className="h-32 md:h-40 text-sm"
                                value={formData.fullDescription}
                                onChange={e => setFormData({ ...formData, fullDescription: e.target.value })}
                            />
                        </div>

                        {/* Update Changes - Only in Edit Mode */}
                        {isEditMode && (
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">
                                    Update Changes <span className="text-destructive">*</span>
                                </label>
                                <TextArea
                                    required
                                    placeholder="Describe what's new in this update (bug fixes, new features, improvements)..."
                                    className="h-24 md:h-32 text-sm"
                                    value={formData.updateChanges}
                                    onChange={e => setFormData({ ...formData, updateChanges: e.target.value })}
                                />
                                <p className="text-xs text-slate-500">
                                    This will help the admin understand what changed in this version.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Media Assets */}
                    <section className="space-y-4">
                        <h3 className="text-base md:text-lg font-bold text-white border-b border-white/10 pb-2">Media Assets</h3>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">App Icon (Image or URL)</label>
                            <div className="flex gap-4 items-start">
                                <div className="flex-1 space-y-3">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setFormData({
                                                        ...formData,
                                                        iconFile: file,
                                                        iconUrl: URL.createObjectURL(file)
                                                    });
                                                }
                                            }}
                                            className="w-full text-sm text-slate-400
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-xs file:font-semibold
                                            file:bg-purple-600 file:text-white
                                            file:cursor-pointer hover:file:bg-purple-700
                                            bg-white/5 rounded-lg border border-white/10 p-1"
                                        />
                                    </div>
                                    <div className="relative flex items-center gap-2">
                                        <span className="text-xs text-slate-500">OR</span>
                                        <Input
                                            placeholder="https://..."
                                            value={formData.iconUrl}
                                            onChange={e => setFormData({ ...formData, iconUrl: e.target.value, iconFile: null })}
                                            className="flex-1 py-2 text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg">
                                    {formData.iconUrl ? (
                                        <img src={formData.iconUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-[10px] text-slate-500 flex flex-col items-center">
                                            <Upload className="w-4 h-4 mb-1" />
                                            Preview
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-[10px] md:text-xs text-slate-500">Recommended: Square PNG, 512x512px</p>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">Screenshots (Optional)</label>
                            <TextArea
                                placeholder="Paste image URLs here (one per line)..."
                                className="h-24 md:h-32 font-mono text-xs md:text-sm"
                                value={formData.screenshots}
                                onChange={e => setFormData({ ...formData, screenshots: e.target.value })}
                            />
                            <p className="text-[10px] md:text-xs text-slate-500">Supported: JPG, PNG. Recommended 16:9 aspect ratio.</p>
                        </div>
                    </section>

                    {/* Technical Details */}
                    <section className="space-y-4">
                        <h3 className="text-base md:text-lg font-bold text-white border-b border-white/10 pb-2">Technical Details</h3>

                        {/* App Type Selection */}
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">App Type</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="appType"
                                        checked={formData.appType === 'apk'}
                                        onChange={() => setFormData({ ...formData, appType: 'apk' })}
                                        className="w-4 h-4 text-purple-600 bg-slate-800 border-gray-600 focus:ring-purple-600 ring-offset-slate-900"
                                    />
                                    <span className="text-sm text-slate-300">App Package (APK / EXE)</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="appType"
                                        checked={formData.appType === 'website'}
                                        onChange={() => setFormData({ ...formData, appType: 'website' })}
                                        className="w-4 h-4 text-purple-600 bg-slate-800 border-gray-600 focus:ring-purple-600 ring-offset-slate-900"
                                    />
                                    <span className="text-sm text-slate-300">Website Link</span>
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">Version</label>
                                <Input
                                    placeholder="1.0.0"
                                    value={formData.version}
                                    onChange={e => setFormData({ ...formData, version: e.target.value })}
                                    className="py-2 text-sm"
                                />
                            </div>
                            <div className="space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">Size</label>
                                <Input
                                    placeholder="e.g. 45 MB"
                                    value={formData.size}
                                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                                    className="py-2 text-sm"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1 space-y-1.5 md:space-y-2">
                                <label className="text-xs md:text-sm font-medium text-slate-300">
                                    {formData.appType === 'apk'
                                        ? (isEditMode ? 'Updated Package URL *' : 'Package URL (APK/EXE)')
                                        : 'Website URL *'}
                                </label>

                                {isEditMode && formData.appType === 'apk' && (
                                    <p className="text-xs text-yellow-500 flex items-center gap-1">
                                        <AlertCircle className="h-3 w-3" />
                                        You must provide a new package to update your app
                                    </p>
                                )}

                                {formData.appType === 'apk' ? (
                                    <div className="space-y-3">
                                        {/* Package File Upload */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept=".apk,.aab,.exe"
                                                onChange={e => setFormData({ ...formData, apkFile: e.target.files[0], apkUrl: URL.createObjectURL(e.target.files[0]) })}
                                                className="w-full text-sm text-slate-400
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-full file:border-0
                                                file:text-xs file:font-semibold
                                                file:bg-purple-600 file:text-white
                                                file:cursor-pointer hover:file:bg-purple-700
                                                bg-white/5 rounded-lg border border-white/10 p-1"
                                            />
                                            {formData.apkFile && (
                                                <p className="text-[10px] text-green-400 mt-1">
                                                    Selected: {formData.apkFile.name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="relative flex items-center gap-2">
                                            <span className="text-xs text-slate-500">OR</span>
                                            <Input
                                                required={isEditMode && !formData.apkFile}
                                                placeholder="https://example.com/app.apk"
                                                value={formData.apkUrl}
                                                onChange={e => setFormData({ ...formData, apkUrl: e.target.value })}
                                                className="py-2 text-sm flex-1"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                        <Input
                                            required={formData.appType === 'website'}
                                            type="url"
                                            placeholder="https://yourwebsite.com"
                                            value={formData.websiteUrl}
                                            onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                                            className="py-2 text-sm pl-9"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300 block mb-2">Supported Platforms</label>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {PLATFORMS.map(platform => (
                                    <button
                                        key={platform}
                                        type="button"
                                        onClick={() => handlePlatformChange(platform)}
                                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg border text-xs md:text-sm font-medium transition-all ${formData.supportedPlatforms.includes(platform)
                                            ? 'bg-purple-500 border-purple-500 text-white'
                                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-xs md:text-sm font-medium text-slate-300">Tags (comma separated)</label>
                            <Input
                                placeholder="Productivity, Tools, Finance..."
                                value={formData.tags}
                                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                className="py-2 text-sm"
                            />
                        </div>
                    </section>

                    {/* Review Process Note */}
                    {isEditMode && (
                        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-blue-300">Review Process</p>
                                    <p className="text-xs text-slate-300">
                                        After submitting your updates, your app will be sent for admin review. Once approved by the admin, your updated app will go live and be visible to all users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-white/5 flex flex-col-reverse md:flex-row items-center justify-end gap-3 md:gap-4">
                        <Button type="button" variant="ghost" onClick={() => navigate('/vendor')} className="w-full md:w-auto text-sm">Cancel</Button>
                        <Button type="submit" disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-0 text-sm">
                            {loading ? 'Submitting...' : (isEditMode ? 'Submit for Review' : 'Submit App for Review')}
                        </Button>
                    </div>
                </form>
            </GlassCard>
        </div>
    );
};
